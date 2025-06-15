import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Recipe } from '../../../../services/recipe.service';

@Component({
  selector: 'app-recipe-img',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipe-img.component.html',
  styleUrl: './recipe-img.component.scss'
})
export class RecipeImgComponent {
  @Input() recipe: Recipe | null = null;
}
