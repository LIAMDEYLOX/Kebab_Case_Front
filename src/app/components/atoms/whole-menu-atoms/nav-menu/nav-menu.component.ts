import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuStateService } from '../../../../services/menu-state.service';
import { ScrollService } from '../../../../services/scroll.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  standalone: true,
  imports: [],
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit, OnDestroy {
  isOpen = false;
  private subscription!: Subscription;

  constructor(
    private menuStateService: MenuStateService, 
    private scrollService: ScrollService) {}

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

  navigateToRecipesOfDay() {
    this.scrollService.scrollToSection('recettes-du-jour');
  }

  navigateToTrending() {
    this.scrollService.scrollToSection('en-vedette');
  }

  navigateToWeeklyMenu() {
    this.scrollService.scrollToSection('menu-semaine');
  }

  navigateToAntiWaste() {
    this.scrollService.scrollToSection('anti-gaspi');
  }
  
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
