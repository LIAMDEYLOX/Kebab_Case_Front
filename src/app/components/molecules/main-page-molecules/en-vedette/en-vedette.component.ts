import { Component } from '@angular/core';
import { RecetteEnVedette1Component } from '../../../atoms/main-page-atoms/en-vedette/recette-en-vedette-1/recette-en-vedette-1.component';
import { RecetteEnVedette2Component } from '../../../atoms/main-page-atoms/en-vedette/recette-en-vedette-2/recette-en-vedette-2.component';
import { RecetteEnVedette3Component } from '../../../atoms/main-page-atoms/en-vedette/recette-en-vedette-3/recette-en-vedette-3.component';
import { RecetteEnVedette4Component } from '../../../atoms/main-page-atoms/en-vedette/recette-en-vedette-4/recette-en-vedette-4.component';

@Component({
  selector: 'app-en-vedette',
  standalone: true,
  imports: [RecetteEnVedette1Component, RecetteEnVedette2Component, RecetteEnVedette3Component, RecetteEnVedette4Component],
  templateUrl: './en-vedette.component.html',
  styleUrl: './en-vedette.component.scss'
})
export class EnVedetteComponent {
  currentIndex = 0;

  goToSlide(index: number) {
    this.currentIndex = index;
  }
}
