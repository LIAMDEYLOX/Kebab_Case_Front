import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-recipe-timing-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './recipe-timing-form.component.html',
  styleUrls: ['./recipe-timing-form.component.scss']
})
export class RecipeTimingFormComponent {
  @Input() form!: FormGroup;
}
