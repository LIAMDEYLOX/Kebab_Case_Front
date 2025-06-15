import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RecipeService, Recipe } from '../../../../../services/recipe.service';

@Component({
  selector: 'app-recette-en-vedette-3',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './recette-en-vedette-3.component.html',
  styleUrl: './recette-en-vedette-3.component.scss'
})
export class RecetteEnVedette3Component implements OnInit {
  recipe: Recipe | null = null;

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.recipeService.getRecipeById(5).subscribe(recipe => {
      this.recipe = recipe;
    });
  }
}