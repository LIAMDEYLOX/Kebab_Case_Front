import { Component } from '@angular/core';

@Component({
  selector: 'app-mardi',
  standalone: true,
  imports: [],
  templateUrl: './mardi.component.html',
  styleUrl: './mardi.component.scss'
})
export class MardiComponent {
  isExpanded = false;

  toggleExpanded() {
    this.isExpanded = !this.isExpanded;
  }
}
