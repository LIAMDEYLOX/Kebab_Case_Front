import { Component, PLATFORM_ID, Inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  // Form data
  loginData = {
    email: '',
    password: ''
  };

  // API response states
  loading = false;
  error: any = null;
  success = false;
  token: any = null;
  errorMessage: string = '';

  // Helper method to check if a value is an array (for use in template)
  isArray(value: any): boolean {
    return Array.isArray(value);
  }

  constructor(
    private authService: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  // Form submission
  onSubmit() {
    this.loading = true;
    this.error = null;
    this.success = false;
    this.errorMessage = '';

    this.authService.login(this.loginData.email, this.loginData.password).subscribe({
      next: (response) => {
        console.log('Login successful', response);
        this.loading = false;
        this.success = true;
        this.token = response;

        // Forcer la vérification du statut d'authentification
        this.authService.checkAuthStatus();

        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 1500);
      },
      error: (err) => {
        console.error('Login failed', err);
        this.loading = false;
        this.error = err;

        if (err.status === 401) {
          this.errorMessage = 'Identifiants incorrects. Veuillez réessayer.';
        } else if (err.status === 403) {
          this.errorMessage = 'Votre compte n\'a pas les permissions nécessaires.';
        } else if (isPlatformBrowser(this.platformId) && !navigator.onLine) {
          this.errorMessage = 'Pas de connexion internet. Veuillez vérifier votre connexion et réessayer.';
        } else {
          this.errorMessage = 'Une erreur est survenue lors de la connexion. Veuillez réessayer plus tard.';
        }
      }
    });
  }
}
