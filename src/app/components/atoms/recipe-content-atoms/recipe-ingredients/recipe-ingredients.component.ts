import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Recipe } from '../../../../services/recipe.service';

@Component({
  selector: 'app-recipe-ingredients',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipe-ingredients.component.html',
  styleUrl: './recipe-ingredients.component.scss'
})
export class RecipeIngredientsComponent {
  @Input() recipe: Recipe | null = null;

  ngOnChanges() {
    console.log('🥕 RecipeIngredients - Recipe reçue:', this.recipe);
    if (this.recipe) {
      console.log('📋 Ingrédients:', this.recipe.ingredients);
      console.log('🔢 Nombre d\'ingrédients:', this.recipe.ingredients?.length || 0);
    }
  }
}
