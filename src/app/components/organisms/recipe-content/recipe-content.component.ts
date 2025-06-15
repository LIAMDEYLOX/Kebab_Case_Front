import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../../../services/recipe.service';
import { FavoritesService } from '../../../services/favorites.service';
import { AuthService } from '../../../services/auth.service';
import { Subscription } from 'rxjs';

// Importer tous les composants utilisés dans le template
import { RecipeHeadComponent } from '../../molecules/recipe-content-molecules/recipe-head/recipe-head.component';
import { RecipeStepsComponent } from '../../atoms/recipe-content-atoms/recipe-steps/recipe-steps.component';
import { RecipePrezComponent } from '../../atoms/recipe-content-atoms/recipe-prez/recipe-prez.component';

@Component({
  selector: 'app-recipe-content',
  imports: [
    CommonModule,
    RecipeHeadComponent,
    RecipeStepsComponent,
    RecipePrezComponent
  ],
  standalone: true,
  templateUrl: './recipe-content.component.html',
  styleUrl: './recipe-content.component.scss'
})
export class RecipeContentComponent implements OnInit, OnDestroy {
  recipe: any = null;
  loading = true;
  error = false;
  isFavorite = false;
  favoriteLoading = false;
  isAuthenticated = false;
  private authSubscription?: Subscription;
  private favoritesSubscription?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService,
    private favoritesService: FavoritesService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Vérifier l'état initial AVANT de s'abonner
    console.log('=== INITIALIZATION ===');
    console.log('AuthService.isAuthenticated (initial):', this.authService.isAuthenticated);
    console.log('Token in sessionStorage:', !!sessionStorage.getItem('auth_token'));
    
    this.isAuthenticated = this.authService.isAuthenticated;
    console.log('Component isAuthenticated (initial):', this.isAuthenticated);

    // S'abonner aux changements d'état d'authentification
    this.authSubscription = this.authService.authStatus$.subscribe(status => {
      console.log('=== AUTH STATUS CHANGE ===');
      console.log('New auth status:', status);
      console.log('Previous component status:', this.isAuthenticated);
      this.isAuthenticated = status;
      
      // Charger les favoris quand l'utilisateur se connecte
      if (status && this.recipe) {
        console.log('Loading favorites because user is authenticated');
        this.favoritesService.loadUserFavorites();
      }
    });

    // S'abonner aux favoris
    this.favoritesSubscription = this.favoritesService.favorites$.subscribe(favorites => {
      if (this.recipe) {
        this.isFavorite = favorites.some((fav: any) => fav.id_recipe === this.recipe.id_recipe);
      }
    });

    this.route.params.subscribe(params => {
      const recipeId = +params['id'];
      if (recipeId) {
        this.loadRecipe(recipeId);
        if (this.isAuthenticated) {
          this.favoritesService.loadUserFavorites();
        }
      }
    });
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
    if (this.favoritesSubscription) {
      this.favoritesSubscription.unsubscribe();
    }
  }

  // Méthode pour vérifier directement si l'utilisateur est connecté
  private isUserAuthenticated(): boolean {
    // Vérifier directement dans sessionStorage
    const token = sessionStorage.getItem('auth_token');
    console.log('Direct token check:', !!token);
    
    if (!token) {
      return false;
    }

    try {
      const parsedToken = JSON.parse(token);
      const isValid = parsedToken && parsedToken.access_token && (!parsedToken.expires_at || parsedToken.expires_at > Date.now());
      console.log('Token is valid:', isValid);
      return isValid;
    } catch (error) {
      console.error('Error parsing token:', error);
      return false;
    }
  }

  toggleFavorite(): void {
    console.log('=== TOGGLE FAVORITE ===');
    console.log('Component isAuthenticated:', this.isAuthenticated);
    console.log('AuthService.isAuthenticated:', this.authService.isAuthenticated);
    console.log('Token exists:', !!sessionStorage.getItem('auth_token'));
    
    // Utiliser notre méthode de vérification directe
    const isAuthenticatedDirect = this.isUserAuthenticated();
    console.log('Direct auth check:', isAuthenticatedDirect);
    
    if (!isAuthenticatedDirect) {
      console.log('Utilisateur non connecté, redirection vers login');
      this.router.navigate(['/login']);
      return;
    }

    if (!this.recipe || this.favoriteLoading) {
      console.log('Recipe non chargée ou operation en cours');
      return;
    }

    // AJOUTEZ CES LOGS DE DEBUG
    console.log('DEBUG COMPONENT: this.recipe COMPLET:', this.recipe);
    console.log('DEBUG COMPONENT: Object.keys(this.recipe):', Object.keys(this.recipe || {}));
    console.log('DEBUG COMPONENT: this.recipe.id_recipe:', this.recipe?.id_recipe);
    console.log('DEBUG COMPONENT: this.recipe.idRecipe:', this.recipe?.idRecipe);
    console.log('DEBUG COMPONENT: this.recipe.id:', this.recipe?.id);
    
    const recipeId = this.recipe?.id_recipe || this.recipe?.idRecipe || this.recipe?.id;
    console.log('DEBUG COMPONENT: recipeId trouvé:', recipeId);
    
    if (!recipeId) {
      console.error('ERROR: No recipe ID available!');
      console.error('DEBUG: Available recipe properties:', Object.keys(this.recipe || {}));
      return;
    }
    
    console.log('DEBUG COMPONENT: Using recipe ID:', recipeId);
    
    this.favoriteLoading = true;
    
    this.favoritesService.toggleFavorite(recipeId).subscribe({
      next: (response: any) => {
        console.log('Réponse toggle favorite:', response);
        this.favoriteLoading = false;
      },
      error: (error: any) => {
        console.error('Erreur lors de la gestion des favoris:', error);
        this.favoriteLoading = false;
        
        if (error.status === 401) {
          console.log('Token invalide, redirection vers login');
          this.authService.logout();
        }
      }
    });
  }

  private loadRecipe(id: number): void {
    this.loading = true;
    this.error = false;
    
    this.recipeService.getRecipeById(id).subscribe({
      next: (recipe: any) => {
        this.recipe = recipe;
        this.loading = false;
        
        // Vérifier les favoris après le chargement de la recette
        if (this.isUserAuthenticated()) {
          this.favoritesService.loadUserFavorites();
        }
      },
      error: (error: any) => {
        console.error('Erreur lors du chargement de la recette:', error);
        this.error = true;
        this.loading = false;
      }
    });
  }

  navigateToHome(): void {
    this.router.navigate(['/home']);
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }
}
