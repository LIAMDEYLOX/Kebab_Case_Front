import { Component } from '@angular/core';
import { IconFacebookComponent } from '../../../atoms/footer-atoms/icon-facebook/icon-facebook.component';
import { IconInstagramComponent } from '../../../atoms/footer-atoms/icon-instagram/icon-instagram.component';
import { IconTwitterComponent } from '../../../atoms/footer-atoms/icon-twitter/icon-twitter.component';
import { IconYoutubeComponent } from '../../../atoms/footer-atoms/icon-youtube/icon-youtube.component';


@Component({
  selector: 'app-social-icons',
  standalone: true,
  imports: [IconFacebookComponent, IconInstagramComponent, IconTwitterComponent, IconYoutubeComponent],
  templateUrl: './social-icons.component.html',
  styleUrl: './social-icons.component.scss'
})
export class SocialIconsComponent {

}
