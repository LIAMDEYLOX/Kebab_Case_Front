import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/organisms/header/header.component';
import { FooterComponent } from './components/organisms/footer/footer.component';
import { WholeMenuComponent } from './components/molecules/whole-menu/whole-menu.component';
import { RecipeContentComponent } from './components/organisms/recipe-content/recipe-content.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent,WholeMenuComponent,RecipeContentComponent],
  templateUrl : './app.component.php',
  styleUrl: './app.component.scss'	
})
export class AppComponent {
  title = 'Kebab_Case_Front';
}
