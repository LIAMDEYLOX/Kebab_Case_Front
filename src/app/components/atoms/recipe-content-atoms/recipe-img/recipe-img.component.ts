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
  imageLoadFailed = false;

  getRecipeImage(): string {
    const r = this.recipe as any;
    if (r?.idRecipe) {
      return `assets/images/recipe-${r.idRecipe}.png`;
    }
    return (
      r?.imageUrl ||
      r?.image ||
      r?.img ||
      'assets/images/default-recipe.png'
    );
  }

  isDefaultImage(): boolean {
    return this.imageLoadFailed || this.getRecipeImage() === 'assets/images/default-recipe.png';
  }

  onImgError(event: Event) {
    this.imageLoadFailed = true;
    (event.target as HTMLImageElement).src = 'assets/images/default-recipe.png';
  }
}