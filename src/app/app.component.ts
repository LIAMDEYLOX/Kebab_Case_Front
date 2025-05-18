import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/organisms/header/header.component';
import { HeadComponent } from './components/atoms/head/head.component';
import { FooterComponent } from './components/organisms/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, HeadComponent, FooterComponent],
  templateUrl : './app.component.php',
  styleUrl: './app.component.scss'	
})
export class AppComponent {
  title = 'Kebab_Case_Front';
}
