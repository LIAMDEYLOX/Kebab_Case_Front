import { Component, EventEmitter, Output, Input } from '@angular/core';
import { ReactiveFormsModule, FormArray, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipe-ingredients-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './recipe-ingredients-form.component.html',
  styleUrls: ['./recipe-ingredients-form.component.scss']
})
export class RecipeIngredientsFormComponent {
  @Input() ingredients!: FormArray;
  @Output() add = new EventEmitter<void>();
  @Output() remove = new EventEmitter<number>();

  get ingredientGroups(): FormGroup[] {
    return this.ingredients.controls as FormGroup[];
  }
}
