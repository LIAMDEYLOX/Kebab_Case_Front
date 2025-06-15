import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RecipeService, Recipe } from '../../../../../services/recipe.service';
@Component({
  selector: 'app-recette-du-jour-3',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './recette-du-jour-3.component.html',
  styleUrl: './recette-du-jour-3.component.scss'
})
export class RecetteDuJour3Component implements OnInit {
  recipe: Recipe | null = null;

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.recipeService.getRecipeById(3).subscribe(recipe => {
      this.recipe = recipe;
    });
  }
}{

}
