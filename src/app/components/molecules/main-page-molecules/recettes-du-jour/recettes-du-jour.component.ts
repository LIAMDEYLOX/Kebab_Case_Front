import { Component } from '@angular/core';
import { Recette1Component } from '../../../atoms/main-page-atoms/recettes-du-jour/recette-1/recette-1.component';
import { Recette2Component } from '../../../atoms/main-page-atoms/recettes-du-jour/recette-2/recette-2.component';
import { Recette3Component } from '../../../atoms/main-page-atoms/recettes-du-jour/recette-3/recette-3.component';

@Component({
  selector: 'app-recettes-du-jour',
  standalone: true,
  imports: [Recette1Component, Recette2Component, Recette3Component],
  templateUrl: './recettes-du-jour.component.html',
  styleUrl: './recettes-du-jour.component.scss'
})
export class RecettesDuJourComponent {

}
