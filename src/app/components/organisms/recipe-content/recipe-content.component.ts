import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RecipeService, Recipe } from '../../../services/recipe.service';
import { RecipeHeadComponent } from '../../molecules/recipe-content-molecules/recipe-head/recipe-head.component';
import { RecipePrezComponent } from '../../atoms/recipe-content-atoms/recipe-prez/recipe-prez.component';
import { RecipeStepsComponent } from '../../atoms/recipe-content-atoms/recipe-steps/recipe-steps.component';

@Component({
  selector: 'app-recipe-content',
  imports: [CommonModule, RecipeStepsComponent, RecipeHeadComponent, RecipePrezComponent],
  standalone: true,
  templateUrl: './recipe-content.component.html',
  styleUrl: './recipe-content.component.scss'
})

export class RecipeContentComponent implements OnInit {
  recipe: Recipe | null = null;
  loading = true;
  error = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadRecipe(+id);
    }
  }

  loadRecipe(id: number): void {
    this.recipeService.getRecipeById(id).subscribe({
      next: (recipe) => {
        this.recipe = recipe;
        this.loading = false;
        if (!recipe) {
          this.error = true;
        }
      },
      error: (error) => {
        console.error('Erreur lors du chargement de la recette:', error);
        this.error = true;
        this.loading = false;
      }
    });
  }

  navigateToHome() {
    this.router.navigate(['/home']);
  }

}
