import { Component } from '@angular/core';

@Component({
  selector: 'app-lundi',
  standalone: true,
  imports: [],
  templateUrl: './lundi.component.html',
  styleUrl: './lundi.component.scss'
})
export class LundiComponent {
  isExpanded = false;

  toggleExpanded() {
    this.isExpanded = !this.isExpanded;
  }
}
