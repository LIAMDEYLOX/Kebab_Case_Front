import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RecipeService, Recipe } from '../../../../../services/recipe.service';

@Component({
  selector: 'app-recette-du-jour-1',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './recette-du-jour-1.component.html',
  styleUrl: './recette-du-jour-1.component.scss'
})
export class RecetteDuJour1Component implements OnInit {
  recipe: Recipe | null = null;

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.recipeService.getRecipeById(1).subscribe(recipe => {
      this.recipe = recipe;
    });
  }
}
