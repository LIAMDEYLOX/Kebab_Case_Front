import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipe-time-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipe-time-display.component.html',
  styleUrl: './recipe-time-display.component.scss'
})
export class RecipeTimeDisplayComponent {
  @Input() preparationTime: number = 0;
  @Input() cookingTime: number = 0;
  @Input() compact: boolean = false;

  get totalTime(): number {
    return this.preparationTime + this.cookingTime;
  }

  get hasTime(): boolean {
    return this.preparationTime > 0 || this.cookingTime > 0;
  }
}
