import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FavoritesService } from '../../../../services/favorites.service';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-favorite-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button *ngIf="isAuthenticated" 
            class="favorite-btn" 
            [class.active]="isFavorite"
            [disabled]="loading"
            (click)="toggleFavorite()"
            [title]="isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'">
      <span class="star-icon" *ngIf="!loading">{{ isFavorite ? '★' : '☆' }}</span>
      <span class="loading-spinner" *ngIf="loading">⟳</span>
    </button>
    
    <div *ngIf="!isAuthenticated && showLoginPrompt" 
        class="login-prompt"
        (click)="navigateToLogin()">
      Se connecter pour ajouter aux favoris
    </div>
  `,
  styleUrl: './favorite-button.component.scss'
})
export class FavoriteButtonComponent implements OnInit, OnDestroy {
  @Input() recipeId!: number;
  @Input() showLoginPrompt = true;
  
  isFavorite = false;
  isAuthenticated = false;
  loading = false;
  
  private favoritesSubscription?: Subscription;

  constructor(
    private favoritesService: FavoritesService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated;
    
    if (this.isAuthenticated) {
      this.favoritesSubscription = this.favoritesService.favorites$.subscribe(
        favorites => {
          this.isFavorite = favorites.includes(this.recipeId);
        }
      );
    }
  }

  ngOnDestroy(): void {
    if (this.favoritesSubscription) {
      this.favoritesSubscription.unsubscribe();
    }
  }

  toggleFavorite(): void {
    if (!this.isAuthenticated || this.loading) return;

    this.loading = true;
    
    this.favoritesService.toggleFavorite(this.recipeId).subscribe({
      next: () => {
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors de la gestion des favoris:', error);
        this.loading = false;
      }
    });
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }
}
