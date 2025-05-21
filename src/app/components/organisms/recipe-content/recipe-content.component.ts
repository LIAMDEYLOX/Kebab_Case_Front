import { Component } from '@angular/core';
import { RecipeStepsComponent } from '../../atoms/recipe-steps/recipe-steps.component';
import { RecipeHeadComponent } from '../../molecules/recipe-head/recipe-head.component';
import { RecipePrezComponent } from '../../atoms/recipe-prez/recipe-prez.component';
@Component({
  selector: 'app-recipe-content',
  imports: [RecipeStepsComponent, RecipeHeadComponent, RecipePrezComponent],
  standalone: true,
  templateUrl: './recipe-content.component.html',
  styleUrl: './recipe-content.component.scss'
})
export class RecipeContentComponent {

}
