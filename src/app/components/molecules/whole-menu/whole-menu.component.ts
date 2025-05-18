import { Component } from '@angular/core';
import { NavMenuComponent } from '../../atoms/nav-menu/nav-menu.component';
import { FiltersMenuComponent } from '../../atoms/filters-menu/filters-menu.component';

@Component({
  selector: 'app-whole-menu',
  imports: [NavMenuComponent, FiltersMenuComponent],
  templateUrl: './whole-menu.component.html',
  styleUrl: './whole-menu.component.scss'
})
export class WholeMenuComponent {

}
