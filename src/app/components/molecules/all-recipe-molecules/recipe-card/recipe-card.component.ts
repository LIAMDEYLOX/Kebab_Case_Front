import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Recipe } from '../../../../services/recipe.service';
import { RecipeRatingStarsComponent } from '../../../atoms/all-recipe-atoms/recipe-rating-stars/recipe-rating-stars.component';

@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    RecipeRatingStarsComponent
    // RecipeTimeDisplayComponent retiré car non utilisé dans le template
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
