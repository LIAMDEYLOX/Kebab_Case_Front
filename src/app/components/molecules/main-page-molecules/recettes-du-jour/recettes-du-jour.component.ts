import { Component } from '@angular/core';
import { RecetteDuJour1Component } from '../../../atoms/main-page-atoms/recettes-du-jour/recette-du-jour-1/recette-du-jour-1.component';
import { RecetteDuJour2Component } from '../../../atoms/main-page-atoms/recettes-du-jour/recette-du-jour-2/recette-du-jour-2.component';
import { RecetteDuJour3Component } from '../../../atoms/main-page-atoms/recettes-du-jour/recette-du-jour-3/recette-du-jour-3.component';

@Component({
  selector: 'app-recettes-du-jour',
  standalone: true,
  imports: [RecetteDuJour1Component, RecetteDuJour2Component, RecetteDuJour3Component],
  templateUrl: './recettes-du-jour.component.html',
  styleUrl: './recettes-du-jour.component.scss'
})
export class RecettesDuJourComponent {

}
