import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuStateService } from '../../../services/menu-state.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-filters-menu',
  standalone: true,
  imports: [],
  templateUrl: './filters-menu.component.html',
  styleUrls: ['./filters-menu.component.scss']
})
export class FiltersMenuComponent implements OnInit, OnDestroy {
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
