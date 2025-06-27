import { Component } from '@angular/core';
import { RecipeFormHeadComponent } from '../../components/organisms/create-recipe-organisms/recipe-form-head/recipe-form-head.component';
import { RecipeIngredientsFormComponent } from '../../components/organisms/create-recipe-organisms/recipe-ingredients-form/recipe-ingredients-form.component';
import { RecipeStepsFormComponent } from '../../components/organisms/create-recipe-organisms/recipe-steps-form/recipe-steps-form.component';
import { RecipeTimingFormComponent } from '../../components/organisms/create-recipe-organisms/recipe-timing-form/recipe-timing-form.component';
import { RecipeDescriptionFormComponent } from '../../components/organisms/create-recipe-organisms/recipe-description-form/recipe-description-form.component';
// import { RecipePreviewComponent } from '../../components/organisms/create-recipe-organisms/recipe-preview/recipe-preview.component';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { CreateRecipeService } from '../../services/create-recipe.sercvice';

@Component({
  selector: 'app-create-recipe',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RecipeFormHeadComponent,
    RecipeIngredientsFormComponent,
    RecipeStepsFormComponent,
    RecipeTimingFormComponent,
    RecipeDescriptionFormComponent,
    // RecipePreviewComponent
  ],
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.scss'],
  providers: [CreateRecipeService]
})
export class CreateRecipeComponent {
  recipeForm: FormGroup;
  submitSuccess: boolean | null = null;
  submitError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private createRecipeService: CreateRecipeService
  ) {
    this.recipeForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      preparationTime: [0, [Validators.required, Validators.min(0)]],
      cookingTime: [0, [Validators.required, Validators.min(0)]],
      portions: [1, [Validators.required, Validators.min(1)]],
      steps: [''],
      ingredients: this.fb.array([]) // [{ name: '', quantity: '', unit: '' }]
    });
    // Ajouter un ingrédient vide par défaut
    this.addIngredient();
  }

  get ingredients(): FormArray {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  addIngredient(ingredient?: any) {
    this.ingredients.push(this.fb.group({
      name: [ingredient?.name || '', Validators.required],
      quantity: [ingredient?.quantity || '', Validators.required],
      unit: [ingredient?.unit || '', Validators.required]
    }));
  }

  removeIngredient(index: number) {
    this.ingredients.removeAt(index);
  }

  onSubmit() {
    this.submitSuccess = null;
    this.submitError = null;
    if (this.recipeForm.valid) {
      this.createRecipeService.createRecipe(this.recipeForm.value).subscribe({
        next: (res) => {
          this.submitSuccess = true;
          // Optionnel: reset le formulaire ou rediriger
          // this.recipeForm.reset();
        },
        error: (err) => {
          this.submitError = err?.error?.message || 'Erreur lors de la création';
        }
      });
    } else {
      this.submitError = 'Veuillez remplir tous les champs obligatoires.';
    }
  }
}