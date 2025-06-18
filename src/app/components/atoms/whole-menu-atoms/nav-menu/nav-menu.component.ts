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
    private scrollService: ScrollService,
    private router: Router) {}

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

  // Navigation vers l'accueil
  navigateToHome() {
    this.router.navigate(['/home']);
    this.menuStateService.closeMenus();
  }

  // Navigation avec vérification de la page actuelle
  private navigateAndScroll(sectionId: string) {
    // Vérifier si on est déjà sur la page home
    if (this.router.url === '/home') {
      // Si on est déjà sur home, juste scroller
      this.scrollService.scrollToSection(sectionId);
    } else {
      // Si on est sur une autre page, naviguer vers home puis scroller
      this.router.navigate(['/home']).then(() => {
        setTimeout(() => {
          this.scrollService.scrollToSection(sectionId);
        }, 100);
      });
    }
    this.menuStateService.closeMenus();
  }

  navigateToRecipesOfDay() {
    this.navigateAndScroll('recettes-du-jour');
  }

  navigateToTrending() {
    this.navigateAndScroll('en-vedette');
  }

  navigateToTopRecipes() {
    this.navigateAndScroll('top-recettes');
  }

  navigateToWeeklyMenu() {
    this.navigateAndScroll('menu-semaine');
  }
  
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
