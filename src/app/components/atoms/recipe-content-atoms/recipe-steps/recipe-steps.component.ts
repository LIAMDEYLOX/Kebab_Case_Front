import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Recipe } from '../../../../services/recipe.service';

@Component({
  selector: 'app-recipe-steps',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipe-steps.component.html',
  styleUrl: './recipe-steps.component.scss'
})
export class RecipeStepsComponent {
  @Input() recipe: Recipe | null = null;
}
