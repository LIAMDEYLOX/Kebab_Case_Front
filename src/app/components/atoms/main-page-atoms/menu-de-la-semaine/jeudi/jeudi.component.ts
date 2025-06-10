import { Component } from '@angular/core';

@Component({
  selector: 'app-jeudi',
  standalone: true,
  imports: [],
  templateUrl: './jeudi.component.html',
  styleUrl: './jeudi.component.scss'
})
export class JeudiComponent {
  isExpanded = false;

  toggleExpanded() {
    this.isExpanded = !this.isExpanded;
  }
}
