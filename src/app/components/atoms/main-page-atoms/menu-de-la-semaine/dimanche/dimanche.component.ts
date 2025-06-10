import { Component } from '@angular/core';

@Component({
  selector: 'app-dimanche',
  standalone: true,
  imports: [],
  templateUrl: './dimanche.component.html',
  styleUrl: './dimanche.component.scss'
})
export class DimancheComponent {
  isExpanded = false;

  toggleExpanded() {
    this.isExpanded = !this.isExpanded;
  }
}
