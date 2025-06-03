import { Component } from '@angular/core';
import { RecetteALaUne1Component } from '../../../atoms/main-page-atoms/a-la-une/recette-a-la-une-1/recette-a-la-une-1.component';
import { RecetteALaUne2Component } from '../../../atoms/main-page-atoms/a-la-une/recette-a-la-une-2/recette-a-la-une-2.component';
import { RecetteALaUne3Component } from '../../../atoms/main-page-atoms/a-la-une/recette-a-la-une-3/recette-a-la-une-3.component';
import { RecetteALaUne4Component } from '../../../atoms/main-page-atoms/a-la-une/recette-a-la-une-4/recette-a-la-une-4.component';

@Component({
  selector: 'app-a-la-une',
  imports: [RecetteALaUne1Component, RecetteALaUne2Component, RecetteALaUne3Component, RecetteALaUne4Component],
  standalone: true,
  templateUrl: './a-la-une.component.html',
  styleUrl: './a-la-une.component.scss'
})
export class ALaUneComponent {

}
