import { Component } from '@angular/core';
import { SearchInputComponent } from '../../../atoms/header-atoms/search-input/search-input.component'; 

@Component({
  selector: 'app-searchbar',
  standalone: true,
  imports: [SearchInputComponent], 
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.scss'
})
export class SearchbarComponent {

}
