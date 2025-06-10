import { Component } from '@angular/core';

@Component({
  selector: 'app-mercredi',
  standalone: true,
  imports: [],
  templateUrl: './mercredi.component.html',
  styleUrl: './mercredi.component.scss'
})
export class MercrediComponent {
  isExpanded = false;

  toggleExpanded() {
    this.isExpanded = !this.isExpanded;
  }
}
