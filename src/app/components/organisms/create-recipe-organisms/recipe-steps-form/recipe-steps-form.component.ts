import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-recipe-steps-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './recipe-steps-form.component.html',
  styleUrls: ['./recipe-steps-form.component.scss']
})
export class RecipeStepsFormComponent {
  @Input() form!: FormGroup;
}
