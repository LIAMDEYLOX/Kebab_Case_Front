import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-settings-layout',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './settings-layout.component.html',
  styleUrls: ['./settings-layout.component.scss']
})
export class SettingsLayoutComponent {
  constructor(private router: Router) {}

  navigateBack(): void {
    this.router.navigate(['/home']);
  }
}
