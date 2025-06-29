import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RecipeService, Recipe } from '../../services/recipe.service';
import { RecipesGridSectionComponent } from '../../components/organisms/all-recipe-organisms/recipes-grid-section/recipes-grid-section.component';
import { SearchResultsHeaderComponent } from '../../components/organisms/all-recipe-organisms/search-results-header/search-results-header.component';
import { EmptyStateSectionComponent } from '../../components/organisms/all-recipe-organisms/empty-state-section/empty-state-section.component';
import { LoadingStateComponent } from '../../components/atoms/all-recipe-atoms/loading-state/loading-state.component';

export interface FilterState {
  searchQuery: string;
  activeFilters: string[];
  sortBy: string;
}

@Component({
  selector: 'app-all-recipes',
  standalone: true,
  imports: [
    CommonModule,
    RecipesGridSectionComponent,
    SearchResultsHeaderComponent,
    EmptyStateSectionComponent,
    LoadingStateComponent
  ],
  templateUrl: './all-recipes.component.html',
  styleUrl: './all-recipes.component.scss'
})
export class AllRecipesComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  filteredRecipes: Recipe[] = [];
  loading = true;
  error = false;
  filterState: FilterState = {
    searchQuery: '',
    activeFilters: [],
    sortBy: 'name'
  };
  
  private subscription = new Subscription();

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadAllRecipes();
    this.handleRouteParams();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadAllRecipes(): void {
    this.loading = true;
    this.error = false;
    const recipesSubscription = this.recipeService.getAllRecipes().subscribe({
      next: (recipes) => {
        this.recipes = recipes;
        this.applyFilters();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading recipes:', error);
        this.error = true;
        this.loading = false;
      }
    });
    this.subscription.add(recipesSubscription);
  }

  private handleRouteParams(): void {
    const routeSubscription = this.route.queryParams.subscribe(params => {
      if (params['search']) {
        this.filterState.searchQuery = params['search'];
      }
      if (params['filters']) {
        // Parser les filtres depuis l'URL
        const filtersString = params['filters'];
        // On ne garde que la valeur du filtre (après le ':', ou tout si pas de ':')
        this.filterState.activeFilters = filtersString.split(',').map((f: string) => {
          return f.includes(':') ? f.split(':')[1] : f;
        });
      } else {
        this.filterState.activeFilters = [];
      }
      this.applyFilters();
    });
    this.subscription.add(routeSubscription);
  }

  onSearchChange(searchQuery: string): void {
    this.filterState.searchQuery = searchQuery;
    this.applyFilters();
  }

  onFiltersChange(filters: string[]): void {
    this.filterState.activeFilters = filters;
    this.applyFilters();
  }

  onSortChange(sortBy: string): void {
    this.filterState.sortBy = sortBy;
    this.applyFilters();
  }

  onRemoveFilter(filterToRemove: string): void {
    if (filterToRemove === 'search') {
      this.filterState.searchQuery = '';
    } else {
      this.filterState.activeFilters = this.filterState.activeFilters.filter(f => f !== filterToRemove);
    }
    
    // Mettre à jour l'URL
    this.updateUrlParams();
    this.applyFilters();
  }

  onClearAllFilters(): void {
    this.filterState = {
      searchQuery: '',
      activeFilters: [],
      sortBy: 'name'
    };
    // Retourner à la home quand on efface tous les filtres
    this.router.navigate(['/home']);
  }

  private updateUrlParams(): void {
    const queryParams: any = {};
    
    if (this.filterState.searchQuery.trim()) {
      queryParams.search = this.filterState.searchQuery;
    }  
    
    if (this.filterState.activeFilters.length > 0) {
      queryParams.filters = this.filterState.activeFilters.join(',');
    }
    
    // Si plus de paramètres, retourner à home
    if (Object.keys(queryParams).length === 0) {
      this.router.navigate(['/home']);
    } else {
      this.router.navigate([], { 
        relativeTo: this.route, 
        queryParams,
        replaceUrl: true 
      });
    }
  }

  private applyFilters(): void {
    let filtered = [...this.recipes];

    // DEBUG: log les recettes et les filtres actifs
    console.log('Recettes reçues:', this.recipes);
    console.log('Filtres actifs:', this.filterState.activeFilters);

    // Recherche texte
    if (this.filterState.searchQuery.trim()) {
      const query = this.filterState.searchQuery.toLowerCase();
      filtered = filtered.filter(recipe =>
        recipe.nameRecipe.toLowerCase().includes(query) ||
        recipe.descriptionRecipe.toLowerCase().includes(query)
      );
    }

    // Filtrage par tags (toutes les valeurs de filtres doivent être présentes dans tags)
    if (this.filterState.activeFilters.length > 0) {
      filtered = filtered.filter(recipe => {
        // DEBUG: log les tags de chaque recette
        console.log('Recipe:', recipe.nameRecipe, 'Tags:', recipe.tags);
        if (!recipe.tags || recipe.tags.length === 0) return false;
        // Toutes les valeurs de filtres doivent être présentes dans les tags de la recette
        return this.filterState.activeFilters.every(filterValue =>
          recipe.tags.some(tag => this.normalize(tag) === this.normalize(filterValue))
        );
      });
    }

    filtered = this.applySorting(filtered);

    // DEBUG: log le résultat du filtrage
    console.log('Recettes filtrées:', filtered);

    this.filteredRecipes = filtered;
  }

  private applySorting(recipes: Recipe[]): Recipe[] {
    switch (this.filterState.sortBy) {
      case 'name':
        return recipes.sort((a, b) => a.nameRecipe.localeCompare(b.nameRecipe));
      case 'rating':
        return recipes.sort((a, b) => b.averageRating - a.averageRating);
      case 'time':
        return recipes.sort((a, b) => (a.preparationTimeRecipe + a.cookingTimeRecipe) - (b.preparationTimeRecipe + b.cookingTimeRecipe));
      default:
        return recipes;
    }
  }

  private normalize(str: string): string {
    return str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  get hasResults(): boolean {
    return this.filteredRecipes.length > 0;
  }

  get hasActiveFilters(): boolean {
    return this.filterState.searchQuery.trim() !== '' || this.filterState.activeFilters.length > 0;
  }
}
