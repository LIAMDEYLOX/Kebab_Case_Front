import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RecipeService, Recipe } from '../../../../../services/recipe.service';

@Component({
  selector: 'app-recette-du-jour-2',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './recette-du-jour-2.component.html',
  styleUrl: './recette-du-jour-2.component.scss'
})
export class RecetteDuJour2Component implements OnInit {
  recipe: Recipe | null = null;

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.recipeService.getRecipeById(2).subscribe(recipe => {
      this.recipe = recipe;
    });
  }
}{

}
