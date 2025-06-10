import { inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { isPlatformBrowser } from '@angular/common';

/**
 * Guard that prevents access to routes that require authentication
 * if the user is not authenticated
 */
export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  // Skip authentication check during server-side rendering
  if (!isPlatformBrowser(platformId)) {
    // Allow navigation during SSR, client-side guard will handle actual protection
    return true;
  }

  if (authService.isAuthenticated) {
    return true;
  }

  // Redirect to login page if not authenticated
  router.navigate(['/login']);
  return false;
};
