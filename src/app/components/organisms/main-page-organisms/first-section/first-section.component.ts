import { Component } from '@angular/core';
import { RecettesDuJourComponent } from '../../../molecules/main-page-molecules/recettes-du-jour/recettes-du-jour.component';
import { TopRecettesComponent } from '../../../molecules/main-page-molecules/top-recettes/top-recettes.component';

@Component({
  selector: 'app-first-section',
  imports: [RecettesDuJourComponent, TopRecettesComponent],
  templateUrl: './first-section.component.html',
  styleUrl: './first-section.component.scss'
})
export class FirstSectionComponent {

}
