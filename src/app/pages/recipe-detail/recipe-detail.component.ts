import { Component } from '@angular/core';
import { RecipeContentComponent } from '../../components/organisms/recipe-content/recipe-content.component';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [RecipeContentComponent],
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.scss'
})
export class RecipeDetailComponent {

}
