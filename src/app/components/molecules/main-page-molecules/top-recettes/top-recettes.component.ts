import { Component } from '@angular/core';
import { TopRecette1Component } from '../../../atoms/main-page-atoms/top-recettes/top-recette-1/top-recette-1.component';
import { TopRecette2Component } from '../../../atoms/main-page-atoms/top-recettes/top-recette-2/top-recette-2.component';
import { TopRecette3Component } from '../../../atoms/main-page-atoms/top-recettes/top-recette-3/top-recette-3.component';

@Component({
  selector: 'app-top-recettes',
  standalone: true,
  imports: [TopRecette1Component, TopRecette2Component, TopRecette3Component],
  templateUrl: './top-recettes.component.html',
  styleUrl: './top-recettes.component.scss'
})
export class TopRecettesComponent {

}
