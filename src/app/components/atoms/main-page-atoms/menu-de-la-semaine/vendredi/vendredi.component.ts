import { Component } from '@angular/core';

@Component({
  selector: 'app-vendredi',
  standalone: true,
  imports: [],
  templateUrl: './vendredi.component.html',
  styleUrl: './vendredi.component.scss'
})
export class VendrediComponent {
  isExpanded = false;

  toggleExpanded() {
    this.isExpanded = !this.isExpanded;
  }
}
