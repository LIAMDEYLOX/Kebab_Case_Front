import { Component } from '@angular/core';

@Component({
  selector: 'app-samedi',
  standalone: true,
  imports: [],
  templateUrl: './samedi.component.html',
  styleUrl: './samedi.component.scss'
})
export class SamediComponent {
  isExpanded = false;

  toggleExpanded() {
    this.isExpanded = !this.isExpanded;
  }
}
