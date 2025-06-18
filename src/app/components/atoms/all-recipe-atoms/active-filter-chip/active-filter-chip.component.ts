import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-active-filter-chip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './active-filter-chip.component.html',
  styleUrl: './active-filter-chip.component.scss'
})
export class ActiveFilterChipComponent {
  @Input() label: string = '';
  @Input() type: 'search' | 'filter' = 'filter';
  @Output() remove = new EventEmitter<void>();

  onRemove(): void {
    this.remove.emit();
  }
}
