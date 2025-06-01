import { Component } from '@angular/core';
import { SocialIconsComponent } from '../../molecules/footer-molecules/social-icons/social-icons.component';
import { FooterLinksComponent } from '../../molecules/footer-molecules/footer-links/footer-links.component';
import { LegalInfoComponent } from '../../atoms/footer-atoms/legal-info/legal-info.component';
import { FooterNavUpComponent } from '../../atoms/footer-atoms/footer-nav-up/footer-nav-up.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [SocialIconsComponent, FooterLinksComponent,LegalInfoComponent, FooterNavUpComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

}
