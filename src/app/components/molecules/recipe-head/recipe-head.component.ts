import { Component } from '@angular/core';
import { RecipeIngredientsComponent } from '../../atoms/recipe-ingredients/recipe-ingredients.component';
import { RecipeImgComponent } from '../../atoms/recipe-img/recipe-img.component';

@Component({
  selector: 'app-recipe-head',
  standalone: true,
  imports: [RecipeIngredientsComponent, RecipeImgComponent],
  templateUrl: './recipe-head.component.html',
  styleUrl: './recipe-head.component.scss'
})
export class RecipeHeadComponent {

}
