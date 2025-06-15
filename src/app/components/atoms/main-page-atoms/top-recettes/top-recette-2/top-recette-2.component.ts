import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RecipeService, Recipe } from '../../../../../services/recipe.service';

@Component({
  selector: 'app-top-recette-2',
  imports: [RouterModule, CommonModule],
  templateUrl: './top-recette-2.component.html',
  styleUrl: './top-recette-2.component.scss'
})
export class TopRecette2Component implements OnInit {
  recipe: Recipe | null = null;

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.recipeService.getRecipeById(1).subscribe(recipe => {
      this.recipe = recipe;
    });
  }
}