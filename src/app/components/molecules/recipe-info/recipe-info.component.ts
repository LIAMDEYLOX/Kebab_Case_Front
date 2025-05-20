import { Component } from '@angular/core';
import { RecipePrezComponent } from '../../atoms/recipe-prez/recipe-prez.component';
import { RecipeIngredientsComponent } from '../../atoms/recipe-ingredients/recipe-ingredients.component';

@Component({
  selector: 'app-recipe-info',
  standalone: true,
  imports: [RecipePrezComponent, RecipeIngredientsComponent],
  templateUrl: './recipe-info.component.html',
  styleUrl: './recipe-info.component.scss'
})
export class RecipeInfoComponent {

}
