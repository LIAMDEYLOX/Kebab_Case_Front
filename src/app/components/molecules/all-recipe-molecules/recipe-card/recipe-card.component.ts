import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Recipe } from '../../../../services/recipe.service';
import { RecipeRatingStarsComponent } from '../../../atoms/all-recipe-atoms/recipe-rating-stars/recipe-rating-stars.component';
import { RecipeTimeDisplayComponent } from '../../../atoms/all-recipe-atoms/recipe-time-display/recipe-time-display.component';

@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    RecipeRatingStarsComponent,
    RecipeTimeDisplayComponent
  ],
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.scss'
})
export class RecipeCardComponent {
  @Input() recipe!: Recipe;

  getRecipeImage(): string {
    // Return a default image or construct image path based on recipe ID
    return `assets/images/recipe-${this.recipe.idRecipe}.png`;
  }
}
