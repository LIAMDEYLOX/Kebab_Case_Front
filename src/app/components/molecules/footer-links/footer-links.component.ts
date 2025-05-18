import { Component } from '@angular/core';
import { LegalLinksComponent } from '../../atoms/legal-links/legal-links.component';
import { PagesLinksComponent } from '../../atoms/pages-links/pages-links.component';

@Component({
  selector: 'app-footer-links',
  standalone: true,
  imports: [LegalLinksComponent, PagesLinksComponent],
  templateUrl: './footer-links.component.html',
  styleUrl: './footer-links.component.scss'
})
export class FooterLinksComponent {

}
