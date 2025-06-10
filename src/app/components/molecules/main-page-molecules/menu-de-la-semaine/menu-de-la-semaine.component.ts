import { Component } from '@angular/core';
import { LundiComponent } from '../../../atoms/main-page-atoms/menu-de-la-semaine/lundi/lundi.component';
import { MardiComponent } from '../../../atoms/main-page-atoms/menu-de-la-semaine/mardi/mardi.component';
import { MercrediComponent } from '../../../atoms/main-page-atoms/menu-de-la-semaine/mercredi/mercredi.component';
import { JeudiComponent} from '../../../atoms/main-page-atoms/menu-de-la-semaine/jeudi/jeudi.component';
import { VendrediComponent } from '../../../atoms/main-page-atoms/menu-de-la-semaine/vendredi/vendredi.component';
import { SamediComponent } from '../../../atoms/main-page-atoms/menu-de-la-semaine/samedi/samedi.component';
import { DimancheComponent } from '../../../atoms/main-page-atoms/menu-de-la-semaine/dimanche/dimanche.component';


@Component({
  selector: 'app-menu-de-la-semaine',
  imports: [LundiComponent, MardiComponent, MercrediComponent, JeudiComponent, VendrediComponent, SamediComponent, DimancheComponent],
  standalone: true,
  templateUrl: './menu-de-la-semaine.component.html',
  styleUrl: './menu-de-la-semaine.component.scss'
})
export class MenuDeLaSemaineComponent {

}
