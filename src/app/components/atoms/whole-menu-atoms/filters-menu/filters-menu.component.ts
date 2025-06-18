import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuStateService } from '../../../../services/menu-state.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filters-menu',
  standalone: true,
  imports: [],
  templateUrl: './filters-menu.component.html',
  styleUrls: ['./filters-menu.component.scss']
})
export class FiltersMenuComponent implements OnInit, OnDestroy {
  isOpen = false;
  private subscription!: Subscription;

  constructor(
    private menuStateService: MenuStateService,
    private router: Router
  ) {}

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

  onFilterChange(filterType: string, filterValue: string, isChecked: boolean): void {
    // Construire les paramètres de query pour les filtres
    const currentParams = new URLSearchParams(window.location.search);
    
    if (isChecked) {
      // Ajouter le filtre
      const existingFilters = currentParams.get('filters') ? currentParams.get('filters')!.split(',') : [];
      const newFilter = `${filterType}:${filterValue}`;
      if (!existingFilters.includes(newFilter)) {
        existingFilters.push(newFilter);
      }
      currentParams.set('filters', existingFilters.join(','));
    } else {
      // Retirer le filtre
      const existingFilters = currentParams.get('filters') ? currentParams.get('filters')!.split(',') : [];
      const filterToRemove = `${filterType}:${filterValue}`;
      const updatedFilters = existingFilters.filter(f => f !== filterToRemove);
      
      if (updatedFilters.length > 0) {
        currentParams.set('filters', updatedFilters.join(','));
      } else {
        currentParams.delete('filters');
      }
    }

    // Navigation
    const hasActiveFilters = currentParams.has('filters') || currentParams.has('search');
    
    if (hasActiveFilters) {
      // Aller vers la page all-recipes avec les filtres
      this.router.navigate(['/all-recipes'], { 
        queryParams: Object.fromEntries(currentParams.entries()) 
      });
    } else {
      // Retourner à la page principale
      this.router.navigate(['/home']);
    }
    
    this.menuStateService.closeMenus();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
