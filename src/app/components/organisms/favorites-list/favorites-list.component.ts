import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { FavoritesService, Favorite } from '../../../services/favorites.service';
import { RecipeService, Recipe } from '../../../services/recipe.service';

@Component({
  selector: 'app-favorites-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './favorites-list.component.html',
  styleUrls: ['./favorites-list.component.scss']
})
export class FavoritesListComponent implements OnInit, OnDestroy {
  favorites: Favorite[] = [];
  loading = true;
  error = false;
  errorMessage = 'Une erreur est survenue lors du chargement des favoris.';
  private subscription = new Subscription();

  constructor(
    private favoritesService: FavoritesService,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    this.loadFavorites();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadFavorites(): void {
    this.loading = true;
    this.error = false;

    const sub = this.favoritesService.getUserFavorites().subscribe({
      next: (favorites) => {
        this.favorites = favorites;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading favorites:', err);
        this.loading = false;
        this.error = true;
        this.errorMessage = 'Impossible de charger vos favoris. Veuillez réessayer plus tard.';
      }
    });

    this.subscription.add(sub);
  }

  removeFavorite(recipeId: number): void {
    const sub = this.favoritesService.removeFromFavorites(recipeId).subscribe({
      next: () => {
        this.favorites = this.favorites.filter(fav => fav.id_recipe !== recipeId);
      },
      error: (err) => {
        console.error('Error removing favorite:', err);
      }
    });

    this.subscription.add(sub);
  }

  retryLoading(): void {
    this.loadFavorites();
  }
}
