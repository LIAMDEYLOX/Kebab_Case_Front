import { Component } from '@angular/core';
import { RecipeImgComponent } from '../../atoms/recipe-img/recipe-img.component';
import { RecipePrezComponent } from '../../atoms/recipe-prez/recipe-prez.component';
import { RecipeStepsComponent } from '../../atoms/recipe-steps/recipe-steps.component';
import { RecipeIngredientsComponent } from '../../atoms/recipe-ingredients/recipe-ingredients.component';

@Component({
  selector: 'app-recipe-content',
  imports: [RecipeImgComponent, RecipePrezComponent, RecipeStepsComponent, RecipeIngredientsComponent],
  standalone: true,
  templateUrl: './recipe-content.component.html',
  styleUrl: './recipe-content.component.scss'
})
export class RecipeContentComponent {

}
