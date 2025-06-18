import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActiveFilterChipComponent } from '../../../atoms/all-recipe-atoms/active-filter-chip/active-filter-chip.component';

@Component({
  selector: 'app-active-filters-bar',
  standalone: true,
  imports: [CommonModule, ActiveFilterChipComponent],
  templateUrl: './active-filters-bar.component.html',
  styleUrl: './active-filters-bar.component.scss'
})
export class ActiveFiltersBarComponent {
  @Input() activeFilters: string[] = [];
  @Input() searchQuery: string = '';
  @Output() removeFilter = new EventEmitter<string>();

  onRemoveFilter(filter: string): void {
    this.removeFilter.emit(filter);
  }

  onRemoveSearchQuery(): void {
    this.removeFilter.emit('search');
  }
}
