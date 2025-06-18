import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  // Flag to check if user is an admin
  isAdmin = false;
  // Flag to track loading state
  loading = true;
  // Flag to track error state
  error = false;
  // Error message
  errorMessage = 'Une erreur est survenue lors du chargement des informations utilisateur.';

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.checkAdminStatus();
  }

  /**
   * Check if the current user has admin privileges
   */
  private checkAdminStatus(): void {
    // Skip API call during server-side rendering
    if (!isPlatformBrowser(this.platformId)) {
      this.loading = false;
      return;
    }

    // Check if user is authenticated first
    if (!this.authService.isAuthenticated) {
      this.loading = false;
      this.error = true;
      this.errorMessage = 'Vous devez être connecté pour accéder à cette page.';

      // Redirect to login after a short delay
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2000);

      return;
    }

    // Use the retry mechanism (3 attempts)
    this.userService.getCurrentUser(3).subscribe({
      next: (user) => {
        // User is an admin if idprofile is 1 or 2
        this.isAdmin = user && (user.idprofile === 1 || user.idprofile === 2);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading user information:', err);
        this.loading = false;
        this.error = true;

        // If it's an authentication error, redirect to login
        if (err?.status === 401 || err?.status === 403) {
          this.errorMessage = 'Votre session a expiré. Veuillez vous reconnecter.';

          // Logout to clear invalid tokens
          this.authService.logout();
        }
      }
    });
  }

  /**
   * Retry loading user information
   */
  retryLoading(): void {
    this.loading = true;
    this.error = false;
    this.checkAdminStatus();
  }

}
