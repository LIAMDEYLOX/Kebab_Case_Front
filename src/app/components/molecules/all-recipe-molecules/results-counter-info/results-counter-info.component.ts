import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-results-counter-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './results-counter-info.component.html',
  styleUrl: './results-counter-info.component.scss'
})
export class ResultsCounterInfoComponent {
  @Input() totalResults: number = 0;
  @Input() loading: boolean = false;
  @Input() hasActiveFilters: boolean = false;

  get resultsText(): string {
    if (this.loading) {
      return 'Chargement...';
    }
    
    if (this.totalResults === 0) {
      return this.hasActiveFilters ? 'Aucun résultat' : 'Aucune recette';
    }
    
    if (this.totalResults === 1) {
      return '1 recette trouvée';
    }
    
    return `${this.totalResults} recettes trouvées`;
  }
}
