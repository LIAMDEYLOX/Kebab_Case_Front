import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SearchbarComponent } from '../../molecules/searchbar/searchbar.component';
import { HeadComponent } from '../../atoms/head/head.component';
import { SettingsComponent } from '../../atoms/settings/settings.component';
// import { LogoComponent } from '../../atoms/logo/logo.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterOutlet, SearchbarComponent, HeadComponent, SettingsComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
