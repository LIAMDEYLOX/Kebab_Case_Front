import { Component } from '@angular/core';
import { FirstSectionComponent } from '../../components/organisms/main-page-organisms/first-section/first-section.component';
import { AntiGaspiComponent } from '../../components/molecules/main-page-molecules/anti-gaspi/anti-gaspi.component';
import { MenuDeLaSemaineComponent } from '../../components/molecules/main-page-molecules/menu-de-la-semaine/menu-de-la-semaine.component';
import { EnVedetteComponent } from '../../components/molecules/main-page-molecules/en-vedette/en-vedette.component';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [FirstSectionComponent, EnVedetteComponent , AntiGaspiComponent, MenuDeLaSemaineComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {

}
