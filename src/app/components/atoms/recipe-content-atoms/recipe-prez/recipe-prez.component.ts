import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Recipe } from '../../../../services/recipe.service';

@Component({
  selector: 'app-recipe-prez',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipe-prez.component.html',
  styleUrl: './recipe-prez.component.scss'
})
export class RecipePrezComponent {
  @Input() recipe: Recipe | null = null;
}
