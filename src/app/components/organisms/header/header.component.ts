import { Component } from '@angular/core';
import { SearchbarComponent } from '../../molecules/header-molecules/searchbar/searchbar.component';
import { SettingsComponent } from '../../atoms/header-atoms/settings/settings.component';
import { AccountComponent } from '../../atoms/header-atoms/account/account.component';
import { LogoComponent } from '../../atoms/header-atoms/logo/logo.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SearchbarComponent, SettingsComponent, AccountComponent, LogoComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
