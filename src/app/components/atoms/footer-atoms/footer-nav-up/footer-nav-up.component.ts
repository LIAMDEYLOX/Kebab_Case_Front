import { Component } from '@angular/core';

@Component({
  selector: 'app-footer-nav-up',
  templateUrl: './footer-nav-up.component.html',
  styleUrls: ['./footer-nav-up.component.scss']
})
export class FooterNavUpComponent {

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}