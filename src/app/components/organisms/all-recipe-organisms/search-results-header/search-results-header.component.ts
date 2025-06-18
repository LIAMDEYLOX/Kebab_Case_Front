import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultsCounterInfoComponent } from '../../../molecules/all-recipe-molecules/results-counter-info/results-counter-info.component';

export interface FilterState {
  searchQuery: string;
  activeFilters: string[];
  sortBy: string;
}

@Component({
  selector: 'app-search-results-header',
  standalone: true,
  imports: [
    CommonModule,
    ResultsCounterInfoComponent
  ],
  templateUrl: './search-results-header.component.html',
  styleUrl: './search-results-header.component.scss'
})
export class SearchResultsHeaderComponent {
  @Input() totalResults: number = 0;
  @Input() loading: boolean = false;
  @Input() filterState!: FilterState;
  @Input() hasActiveFilters: boolean = false;
  @Output() sortChange = new EventEmitter<string>();
  @Output() clearAllFilters = new EventEmitter<void>();

  onSortChange(sortBy: string): void {
    this.sortChange.emit(sortBy);
  }

  onClearAllFilters(): void {
    this.clearAllFilters.emit();
  }
}