import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-input-with-button',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-input-with-button.component.html',
  styleUrl: './search-input-with-button.component.scss'
})
export class SearchInputWithButtonComponent implements OnInit {
  @Input() initialValue: string = '';
  @Input() placeholder: string = 'Rechercher une recette...';
  @Output() searchChange = new EventEmitter<string>();

  searchQuery: string = '';

  ngOnInit(): void {
    this.searchQuery = this.initialValue;
  }

  onSearch(): void {
    this.searchChange.emit(this.searchQuery.trim());
  }

  onClear(): void {
    this.searchQuery = '';
    this.searchChange.emit('');
  }

  onKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.onSearch();
    }
  }
}
