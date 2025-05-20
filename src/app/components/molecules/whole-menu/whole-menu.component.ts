import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuStateService } from '../../../services/menu-state.service';
import { Subscription } from 'rxjs';
import { NavMenuComponent } from '../../atoms/nav-menu/nav-menu.component';
import { FiltersMenuComponent } from '../../atoms/filters-menu/filters-menu.component';

@Component({
  selector: 'app-whole-menu',
  standalone: true,
  imports: [NavMenuComponent, FiltersMenuComponent],
  templateUrl: './whole-menu.component.html',
  styleUrls: ['./whole-menu.component.scss']
})
export class WholeMenuComponent implements OnInit, OnDestroy {
  isOpen = false;
  private subscription: Subscription = new Subscription();

  constructor(private menuStateService: MenuStateService) {}

  ngOnInit() {
    this.subscription = this.menuStateService.menusOpen$.subscribe((isOpen: boolean) => {
      this.isOpen = isOpen;
    });
  }

  onMouseEnter() {
    this.menuStateService.openMenus();
  }

  onMouseLeave() {
    this.menuStateService.closeMenus();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}