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
  templateUrl: './favorite-button.component.html',
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

    // Log pour vérifier l'état initial
    console.log('[FAV BTN INIT]', { recipeId: this.recipeId, isAuthenticated: this.isAuthenticated });

    if (this.isAuthenticated) {
      this.favoritesSubscription = this.favoritesService.favorites$.subscribe(
        favorites => {
          // Log pour voir la liste des favoris et l'état du bouton
          console.log('[FAV BTN SUB]', { recipeId: this.recipeId, favorites, isFavorite: favorites.includes(this.recipeId) });
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
        // Log après ajout/suppression
        console.log('[FAV BTN TOGGLE] done, isFavorite:', this.isFavorite);
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
  }
}
    });
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }
}
