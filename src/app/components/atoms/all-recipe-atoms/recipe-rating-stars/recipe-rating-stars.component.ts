import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipe-rating-stars',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipe-rating-stars.component.html',
  styleUrl: './recipe-rating-stars.component.scss'
})
export class RecipeRatingStarsComponent {
  @Input() rating: number = 0;
  @Input() maxStars: number = 5;
  @Input() showRatingText: boolean = true;

  get stars(): { filled: boolean, half: boolean }[] {
    const stars = [];
    for (let i = 1; i <= this.maxStars; i++) {
      stars.push({
        filled: this.rating >= i,
        half: this.rating >= i - 0.5 && this.rating < i
      });
    }
    return stars;
  }

  get ratingText(): string {
    return `${this.rating.toFixed(1)}/${this.maxStars}`;
  }
}
