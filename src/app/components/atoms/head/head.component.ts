import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-head',
  standalone: true,
  template: '', // Empty template since we're just modifying document head
})
export class HeadComponent implements OnInit {
  constructor(
    private titleService: Title,
    private metaService: Meta
  ) {}

  ngOnInit(): void {
    // Set the document title
    this.titleService.setTitle('KebabCaseFront');
    
    // Add or update meta tags
    this.metaService.addTag({ name: 'viewport', content: 'width=device-width, initial-scale=1' });
    
    // Add the Google Fonts link programmatically
    this.addLinkToHead('https://fonts.googleapis.com/icon?family=Material+Icons');
    this.addLinkToHead('https://fonts.googleapis.com/css2?family=Montserrat+Subrayada:wght@400;700&display=swap');
  }

  private addLinkToHead(href: string): void {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
  }
}
