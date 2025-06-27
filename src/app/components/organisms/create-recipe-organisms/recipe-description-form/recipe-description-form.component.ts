import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-recipe-description-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './recipe-description-form.component.html',
  styleUrls: ['./recipe-description-form.component.scss']
})
export class RecipeDescriptionFormComponent {
  @Input() form!: FormGroup;
}
