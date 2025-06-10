import { inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

/**
 * Guard that prevents access to routes that require admin privileges
 * if the user does not have the required profile ID (1 or 2)
 */
export const adminGuard = () => {
  const userService = inject(UserService);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  // Skip API call during server-side rendering
  if (!isPlatformBrowser(platformId)) {
    // Allow navigation during SSR, client-side guard will handle actual protection
    return true;
  }

  return userService.getCurrentUser().pipe(
    map(user => {
      // Check if user has admin privileges (idprofile 1 or 2)
      if (user && (user.idprofile === 1 || user.idprofile === 2)) {
        return true;
      }

      // Redirect to dashboard if not an admin
      router.navigate(['/dashboard']);
      return false;
    }),
    catchError(() => {
      // Redirect to dashboard on error
      router.navigate(['/dashboard']);
      return of(false);
    })
  );
};
