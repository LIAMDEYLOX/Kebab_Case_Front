import { Injectable, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subscription, timer } from 'rxjs';
import { UserService } from './user.service';
import { isPlatformBrowser } from '@angular/common';

interface AuthToken {
  access_token: string;
  token_type: string;
  refresh_token: string;
  expires_at?: number; // Timestamp when token expires
}

/**
 * Authentication service that manages user authentication state
 * and token refresh using token rotation.
 *
 * Token rotation is a security mechanism where each time a refresh token is used,
 * a new refresh token is issued along with a new access token. This ensures that
 * if a refresh token is compromised, it can only be used once before becoming invalid.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {
  private currentUserSubject: BehaviorSubject<AuthToken | null>;
  public currentUser: Observable<AuthToken | null>;

  // Token expiration time in milliseconds (default: 1 hour)
  private tokenExpirationTime = 60 * 60 * 1000;

  // Time before expiration to refresh token (default: 5 minutes)
  private refreshBeforeExpiration = 5 * 60 * 1000;

  // Subscription for token refresh timer
  private refreshTokenSubscription?: Subscription;

  constructor(
    private router: Router,
    private userService: UserService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // Initialize from sessionStorage if available
    const storedToken = this.getStoredToken();
    this.currentUserSubject = new BehaviorSubject<AuthToken | null>(storedToken);
    this.currentUser = this.currentUserSubject.asObservable();

    // Set up token refresh if a valid token exists
    if (storedToken) {
      this.setupTokenRefresh();
    }
  }

  /**
   * Check if code is running in a browser environment
   */
  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  ngOnDestroy(): void {
    // Clean up subscriptions
    if (this.refreshTokenSubscription) {
      this.refreshTokenSubscription.unsubscribe();
    }
  }

  /**
   * Get the current authentication token
   */
  public get currentTokenValue(): AuthToken | null {
    return this.currentUserSubject.value;
  }

  /**
   * Check if user is authenticated
   */
  public get isAuthenticated(): boolean {
    const token = this.currentTokenValue;
    if (!token) {
      return false;
    }

    // Check if token has expired
    if (token.expires_at && token.expires_at < Date.now()) {
      this.logout();
      return false;
    }

    return true;
  }

  /**
   * Login user and store token
   */
  login(email: string, password: string): Observable<any> {
    return new Observable(observer => {
      this.userService.login(email, password).subscribe({
        next: (response) => {
          // If response doesn't include refresh_token, add a default one
          // This is a workaround for APIs that don't include refresh_token in the response
          if (!response.refresh_token) {
            console.warn('Login response missing refresh_token, using access_token as fallback');
            response.refresh_token = response.access_token;
          }

          // Add expiration time to token
          const token: AuthToken = {
            ...response,
            expires_at: Date.now() + this.tokenExpirationTime
          };

          // Store token in sessionStorage and update subject
          this.storeToken(token);
          this.currentUserSubject.next(token);

          // Set up token refresh
          this.setupTokenRefresh();

          observer.next(response);
          observer.complete();
        },
        error: (error) => {
          observer.error(error);
          observer.complete();
        }
      });
    });
  }

  /**
   * Set up token refresh timer
   */
  private setupTokenRefresh(): void {
    // Cancel any existing refresh timer
    if (this.refreshTokenSubscription) {
      this.refreshTokenSubscription.unsubscribe();
    }

    const token = this.currentTokenValue;
    if (!token || !token.expires_at) {
      return;
    }

    // Calculate time until refresh (expiration time - refresh before expiration)
    const expiresAt = token.expires_at;
    const refreshAt = expiresAt - this.refreshBeforeExpiration;
    const now = Date.now();

    // If token is already expired or refresh time has passed, logout
    if (expiresAt <= now) {
      this.logout();
      return;
    }

    // If refresh time has passed but token is still valid, refresh immediately
    if (refreshAt <= now && now < expiresAt) {
      this.refreshToken();
      return;
    }

    // Set up timer to refresh token
    const timeUntilRefresh = refreshAt - now;
    this.refreshTokenSubscription = timer(timeUntilRefresh).subscribe(() => {
      this.refreshToken();
    });
  }

  /**
   * Refresh the authentication token
   */
  private refreshToken(): void {
    const token = this.currentTokenValue;
    if (!token || !token.refresh_token) {
      return;
    }

    // Call the API endpoint to refresh the token
    this.userService.refreshToken(token.refresh_token).subscribe({
      next: (response) => {
        // Add expiration time to token
        const refreshedToken: AuthToken = {
          ...response,
          expires_at: Date.now() + this.tokenExpirationTime
        };

        // Store refreshed token and update subject
        this.storeToken(refreshedToken);
        this.currentUserSubject.next(refreshedToken);

        // Set up next refresh
        this.setupTokenRefresh();
      },
      error: (error) => {
        console.error('Failed to refresh token', error);
        // If refresh fails, log the user out
        this.logout();
      }
    });
  }

  /**
   * Logout user and clear token
   */
  logout(): void {
    // Cancel refresh timer
    if (this.refreshTokenSubscription) {
      this.refreshTokenSubscription.unsubscribe();
      this.refreshTokenSubscription = undefined;
    }

    // Remove token from sessionStorage if in browser
    if (this.isBrowser()) {
      sessionStorage.removeItem('auth_token');
    }

    // Clear current user subject
    this.currentUserSubject.next(null);

    // Redirect to login page
    this.router.navigate(['/login']);
  }

  /**
   * Get authorization header for API requests
   */
  getAuthorizationHeader(): string | null {
    const token = this.currentTokenValue;
    if (!token) {
      return null;
    }

    return `${token.token_type} ${token.access_token}`;
  }

  /**
   * Store token in sessionStorage for better security
   * (sessionStorage is cleared when the browser is closed)
   */
  private storeToken(token: AuthToken): void {
    if (this.isBrowser()) {
      sessionStorage.setItem('auth_token', JSON.stringify(token));
    }
  }

  /**
   * Get token from sessionStorage
   */
  private getStoredToken(): AuthToken | null {
    if (!this.isBrowser()) {
      return null;
    }

    const tokenStr = sessionStorage.getItem('auth_token');
    if (!tokenStr) {
      return null;
    }

    try {
      const token = JSON.parse(tokenStr) as AuthToken;

      // Check if token has expired
      if (token.expires_at && token.expires_at < Date.now()) {
        sessionStorage.removeItem('auth_token');
        return null;
      }

      return token;
    } catch (e) {
      sessionStorage.removeItem('auth_token');
      return null;
    }
  }
}
