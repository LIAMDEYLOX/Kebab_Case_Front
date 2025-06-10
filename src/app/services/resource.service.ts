import { Injectable, Renderer2, RendererFactory2, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {
  private renderer: Renderer2;

  constructor(
    rendererFactory: RendererFactory2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  loadMaterialIcons(): void {
    // Skip in server-side rendering
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const link = this.renderer.createElement('link');
    this.renderer.setAttribute(link, 'rel', 'stylesheet');
    this.renderer.setAttribute(link, 'href', 'https://fonts.googleapis.com/icon?family=Material+Icons');
    this.renderer.appendChild(document.head, link);
  }

  // Add more methods for other resources as needed
}
