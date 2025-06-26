import { Component } from '@angular/core';
import { FirstSectionComponent } from '../../components/organisms/main-page-organisms/first-section/first-section.component';
import { EnVedetteComponent } from '../../components/molecules/main-page-molecules/en-vedette/en-vedette.component';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [FirstSectionComponent, EnVedetteComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {

}
