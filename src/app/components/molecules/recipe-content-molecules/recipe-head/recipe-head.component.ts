import { Component, Input } from '@angular/core';
import { Recipe } from '../../../../services/recipe.service';
import { CommonModule } from '@angular/common'; 
import { RecipeIngredientsComponent } from '../../../atoms/recipe-content-atoms/recipe-ingredients/recipe-ingredients.component';
import { RecipeImgComponent } from '../../../atoms/recipe-content-atoms/recipe-img/recipe-img.component';


@Component({
  selector: 'app-recipe-head',
  standalone: true,
  imports: [RecipeIngredientsComponent, RecipeImgComponent, CommonModule],
  templateUrl: './recipe-head.component.html',
  styleUrl: './recipe-head.component.scss'
})
export class RecipeHeadComponent {
  @Input() recipe: Recipe | null = null;
}
