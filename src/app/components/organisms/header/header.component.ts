import { Component } from '@angular/core';
import { SearchbarComponent } from '../../molecules/searchbar/searchbar.component';
import { SettingsComponent } from '../../atoms/settings/settings.component';
import { AccountComponent } from '../../atoms/account/account.component';
import { LogoComponent } from '../../atoms/logo/logo.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SearchbarComponent, SettingsComponent, AccountComponent, LogoComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
