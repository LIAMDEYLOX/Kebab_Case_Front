import { Component } from '@angular/core';
import { FirstSectionComponent } from '../../components/organisms/main-page-organisms/first-section/first-section.component';
import { ALaUneComponent } from '../../components/molecules/main-page-molecules/a-la-une/a-la-une.component';
import { AntiGaspiComponent } from '../../components/molecules/main-page-molecules/anti-gaspi/anti-gaspi.component';
import { MenuDeLaSemaineComponent } from '../../components/molecules/main-page-molecules/menu-de-la-semaine/menu-de-la-semaine.component';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [FirstSectionComponent, ALaUneComponent, AntiGaspiComponent, MenuDeLaSemaineComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {

}
