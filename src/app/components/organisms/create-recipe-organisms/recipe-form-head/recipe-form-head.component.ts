import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-recipe-form-head',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './recipe-form-head.component.html',
  styleUrls: ['./recipe-form-head.component.scss']
})
export class RecipeFormHeadComponent {
  @Input() form!: FormGroup;
}
