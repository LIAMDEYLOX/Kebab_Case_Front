import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-recette-du-jour-1',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './recette-du-jour-1.component.html',
  styleUrl: './recette-du-jour-1.component.scss'
})
export class RecetteDuJour1Component {

constructor(private router: Router) {}
  
  navigateToRecipe(): void {
    this.router.navigate(['/recipe', '1']);
  }

}
