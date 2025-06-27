import { Injectable, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subscription, timer, of } from 'rxjs';
import { UserService } from './user.service';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

interface AuthToken {
  access_token: string;
  token_type: string;
  refresh_token: string;
  expires_at?: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {
  private currentUserSubject: BehaviorSubject<AuthToken | null>;
  public currentUser: Observable<AuthToken | null>;
  
  // Ajouter un BehaviorSubject pour l'état d'authentification
  private authStatusSubject = new BehaviorSubject<boolean>(false);
  public authStatus$ = this.authStatusSubject.asObservable();

  private tokenExpirationTime = 60 * 60 * 1000;
  private refreshBeforeExpiration = 5 * 60 * 1000;
  private refreshTokenSubscription?: Subscription;

  constructor(
    private router: Router,
    private userService: UserService,
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    const storedToken = this.getStoredToken();
    this.currentUserSubject = new BehaviorSubject<AuthToken | null>(storedToken);
    this.currentUser = this.currentUserSubject.asObservable();
    
    // Initialiser l'état d'authentification
    this.authStatusSubject.next(!!storedToken && this.isTokenValid(storedToken));

    if (storedToken && this.isTokenValid(storedToken)) {
      this.setupTokenRefresh();
    }
  }

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  ngOnDestroy(): void {
    if (this.refreshTokenSubscription) {
      this.refreshTokenSubscription.unsubscribe();
    }
  }

  public get currentTokenValue(): AuthToken | null {
    return this.currentUserSubject.value;
  }

  // Modifier le getter isAuthenticated pour être cohérent
  public get isAuthenticated(): boolean {
    const token = this.getStoredToken();
    const isValid = token && this.isTokenValid(token);
    return !!isValid;
  }

  // Ajouter une méthode pour vérifier la validité du token
  private isTokenValid(token: AuthToken): boolean {
    if (!token.access_token) return false;
    
    try {
      const payload = JSON.parse(atob(token.access_token.split('.')[1]));
      const now = Date.now() / 1000;
      
      if (payload.exp && payload.exp < now) {
        console.log('Token expiré');
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Erreur lors de la vérification du token:', error);
      return false;
    }
  }

  login(email: string, password: string): Observable<any> {
    return new Observable(observer => {
      this.userService.login(email, password).subscribe({
        next: (response) => {
          if (!response.refresh_token) {
            console.warn('Login response missing refresh_token, using access_token as fallback');
            response.refresh_token = response.access_token;
          }

          const token: AuthToken = {
            ...response,
            expires_at: Date.now() + this.tokenExpirationTime
          };

          this.storeToken(token);
          this.currentUserSubject.next(token);
          
          // Mettre à jour l'état d'authentification
          this.authStatusSubject.next(true);

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

  private setupTokenRefresh(): void {
    if (this.refreshTokenSubscription) {
      this.refreshTokenSubscription.unsubscribe();
    }

    const token = this.currentTokenValue;
    if (!token || !token.expires_at) {
      return;
    }

    const expiresAt = token.expires_at;
    const refreshAt = expiresAt - this.refreshBeforeExpiration;
    const now = Date.now();

    if (expiresAt <= now) {
      this.logout();
      return;
    }

    if (refreshAt <= now && now < expiresAt) {
      this.refreshToken();
      return;
    }

    const timeUntilRefresh = refreshAt - now;
    this.refreshTokenSubscription = timer(timeUntilRefresh).subscribe(() => {
      this.refreshToken();
    });
  }

  private refreshToken(): void {
    const token = this.currentTokenValue;
    if (!token || !token.refresh_token) {
      return;
    }

    this.userService.refreshToken(token.refresh_token).subscribe({
      next: (response) => {
        const refreshedToken: AuthToken = {
          ...response,
          expires_at: Date.now() + this.tokenExpirationTime
        };

        this.storeToken(refreshedToken);
        this.currentUserSubject.next(refreshedToken);
        
        // Maintenir l'état d'authentification
        this.authStatusSubject.next(true);

        this.setupTokenRefresh();
      },
      error: (error) => {
        console.error('Failed to refresh token', error);
        this.logout();
      }
    });
  }

  logout(): void {
    if (this.refreshTokenSubscription) {
      this.refreshTokenSubscription.unsubscribe();
      this.refreshTokenSubscription = undefined;
    }

    if (this.isBrowser()) {
      sessionStorage.removeItem('auth_token');
    }

    this.currentUserSubject.next(null);
    // Mettre à jour l'état d'authentification
    this.authStatusSubject.next(false);

    this.router.navigate(['/login']);
  }

  getAuthorizationHeader(): string | null {
    const token = this.currentTokenValue;
    if (!token) {
      return null;
    }

    return `${token.token_type} ${token.access_token}`;
  }

  private storeToken(token: AuthToken): void {
    if (this.isBrowser()) {
      sessionStorage.setItem('auth_token', JSON.stringify(token));
    }
  }

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

  // Ajouter une méthode pour forcer la vérification du statut
  public checkAuthStatus(): void {
    const isAuth = this.isAuthenticated;
    this.authStatusSubject.next(isAuth);
  }


  public getToken(): string | null {
    const token = this.currentTokenValue;
    return token ? token.access_token : null;
  }

  getCurrentUser(): Observable<{ id: number; pseudouser: string } | null> {
    const token = this.getToken();
    if (!token) {
      return of(null);
    }
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<any>('http://localhost:8000/users/me', { headers }).pipe(
      map(user => ({
        id: user.iduser,
        pseudouser: user.pseudouser
      }))
    );
  }
}
