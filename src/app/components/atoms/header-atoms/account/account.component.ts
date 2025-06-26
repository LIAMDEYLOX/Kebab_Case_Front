import { Component, HostListener, PLATFORM_ID, Inject, OnInit, OnDestroy } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AuthService } from '../../../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent implements OnInit, OnDestroy {
  isDropdownOpen = false;
  isAuthenticated = false;
  private hoverTimeout: any;
  private authSubscription?: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    // Vérifier l'état initial
    this.isAuthenticated = this.authService.isAuthenticated;
    console.log('Account component init - isAuthenticated:', this.isAuthenticated);
    
    // S'abonner aux changements d'état d'authentification
    this.authSubscription = this.authService.authStatus$.subscribe(status => {
      console.log('Auth status changed:', status);
      this.isAuthenticated = status;
    });
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  onMouseEnter() {
    if (this.hoverTimeout) {
      clearTimeout(this.hoverTimeout);
    }
    if (this.isAuthenticated) {
      this.isDropdownOpen = true;
    }
  }

  onMouseLeave() {
    this.hoverTimeout = setTimeout(() => {
      this.isDropdownOpen = false;
    }, 650); 
  }

  onDropdownClick() {
    if (this.hoverTimeout) {
      clearTimeout(this.hoverTimeout);
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const target = event.target as HTMLElement;
    const accountContainer = document.querySelector('.account-container');

    if (accountContainer && !accountContainer.contains(target)) {
      this.isDropdownOpen = false;
    }
  }

  toggleDropdown(event: Event): void {
    event.stopPropagation();
    if (this.isAuthenticated) {
      this.isDropdownOpen = !this.isDropdownOpen;
    }
  }

  closeDropdown(): void {
    this.isDropdownOpen = false;
  }

  logout(): void {
    this.authService.logout();
    this.closeDropdown();
  }

  navigateToDashboard(event: Event): void {
    event.stopPropagation();
    this.router.navigate(['/dashboard']);
  }

  navigateToCreateRecipe(event: Event): void {
    event.stopPropagation();
    this.closeDropdown();
    this.router.navigate(['/create-recipe']);
  }
}
