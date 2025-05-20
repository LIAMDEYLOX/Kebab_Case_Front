import { Component } from '@angular/core';
import { RecipeImgComponent } from '../../atoms/recipe-img/recipe-img.component';
import { RecipeStepsComponent } from '../../atoms/recipe-steps/recipe-steps.component';
import { RecipeInfoComponent } from '../../molecules/recipe-info/recipe-info.component';
@Component({
  selector: 'app-recipe-content',
  imports: [RecipeImgComponent, RecipeStepsComponent, RecipeInfoComponent],
  standalone: true,
  templateUrl: './recipe-content.component.html',
  styleUrl: './recipe-content.component.scss'
})
export class RecipeContentComponent {

}
