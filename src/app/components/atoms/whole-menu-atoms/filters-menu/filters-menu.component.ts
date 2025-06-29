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
    // On ne stocke que la valeur du filtre (ex: "Végétarien")
    const currentParams = new URLSearchParams(window.location.search);

    let existingFilters = currentParams.get('filters') ? currentParams.get('filters')!.split(',') : [];

    if (isChecked) {
      if (!existingFilters.includes(filterValue)) {
        existingFilters.push(filterValue);
      }
    } else {
      existingFilters = existingFilters.filter(f => f !== filterValue);
    }

    if (existingFilters.length > 0) {
      currentParams.set('filters', existingFilters.join(','));
    } else {
      currentParams.delete('filters');
    }

    const hasActiveFilters = currentParams.has('filters') || currentParams.has('search');
    if (hasActiveFilters) {
      this.router.navigate(['/all-recipes'], {
        queryParams: Object.fromEntries(currentParams.entries())
      });
    } else {
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
