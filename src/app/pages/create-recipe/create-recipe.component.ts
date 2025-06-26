import { Component } from '@angular/core';
import { RecipeFormHeadComponent } from '../../components/organisms/create-recipe-organisms/recipe-form-head/recipe-form-head.component';
import { RecipeIngredientsFormComponent } from '../../components/organisms/create-recipe-organisms/recipe-ingredients-form/recipe-ingredients-form.component';
import { RecipeStepsFormComponent } from '../../components/organisms/create-recipe-organisms/recipe-steps-form/recipe-steps-form.component';
import { RecipeTimingFormComponent } from '../../components/organisms/create-recipe-organisms/recipe-timing-form/recipe-timing-form.component';
import { RecipeDescriptionFormComponent } from '../../components/organisms/create-recipe-organisms/recipe-description-form/recipe-description-form.component';
// import { RecipePreviewComponent } from '../../components/organisms/create-recipe-organisms/recipe-preview/recipe-preview.component';

@Component({
  selector: 'app-create-recipe',
  standalone: true,
  imports: [
    RecipeFormHeadComponent,
    RecipeIngredientsFormComponent,
    RecipeStepsFormComponent,
    RecipeTimingFormComponent,
    RecipeDescriptionFormComponent,
    // RecipePreviewComponent
  ],
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.scss']
})
export class CreateRecipeComponent {
  // ...future logic for form state and submission...
}