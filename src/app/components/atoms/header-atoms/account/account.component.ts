import { Component, HostListener, PLATFORM_ID, Inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent {
  // Track dropdown state
  isDropdownOpen = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  // Close dropdown when clicking outside
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    // Skip in server-side rendering
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    // Check if click was outside the account container
    const target = event.target as HTMLElement;
    const accountContainer = document.querySelector('.account-container');

    if (accountContainer && !accountContainer.contains(target)) {
      this.isDropdownOpen = false;
    }
  }

  /**
   * Check if user is authenticated
   */
  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated;
  }

  /**
   * Toggle dropdown menu
   */
  toggleDropdown(event: Event): void {
    event.stopPropagation();
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  /**
   * Close dropdown when clicking outside
   */
  closeDropdown(): void {
    this.isDropdownOpen = false;
  }

  /**
   * Logout user
   */
  logout(): void {
    this.authService.logout();
  }

  /**
   * Navigate to dashboard page
   */
  navigateToDashboard(event: Event): void {
    // Stop propagation to prevent dropdown toggle
    event.stopPropagation();

    // Navigate to dashboard
    this.router.navigate(['/dashboard']);
  }
}
