import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Recipe } from '../../../../services/recipe.service';
import { RecipeCardComponent } from '../../../molecules/all-recipe-molecules/recipe-card/recipe-card.component';
import { ActiveFiltersBarComponent } from '../../../molecules/all-recipe-molecules/active-filters-bar/active-filters-bar.component';

export interface FilterState {
  searchQuery: string;
  activeFilters: string[];
  sortBy: string;
}

@Component({
  selector: 'app-recipes-grid-section',
  standalone: true,
  imports: [
    CommonModule,
    RecipeCardComponent,
    ActiveFiltersBarComponent
  ],
  templateUrl: './recipes-grid-section.component.html',
  styleUrl: './recipes-grid-section.component.scss'
})
export class RecipesGridSectionComponent {
  @Input() recipes: Recipe[] = [];
  @Input() filterState!: FilterState;
  @Output() removeFilter = new EventEmitter<string>();

  onRemoveFilter(filter: string): void {
    this.removeFilter.emit(filter);
  }

  trackByRecipeId(index: number, recipe: Recipe): number {
    return recipe.idRecipe;
  }
}
