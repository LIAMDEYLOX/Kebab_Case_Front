import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-empty-state-section',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './empty-state-section.component.html',
  styleUrl: './empty-state-section.component.scss'
})
export class EmptyStateSectionComponent {
  @Input() hasActiveFilters: boolean = false;
  @Input() searchQuery: string = '';
  @Output() clearFilters = new EventEmitter<void>();

  onClearFilters(): void {
    this.clearFilters.emit();
  }
}
