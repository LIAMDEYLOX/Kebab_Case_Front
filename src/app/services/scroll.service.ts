import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ScrollService {
    private scrollToSectionSubject = new BehaviorSubject<string>('');
    scrollToSection$ = this.scrollToSectionSubject.asObservable();

    scrollToSection(sectionId: string) {
        this.scrollToSectionSubject.next(sectionId);
        
    setTimeout(() => {
            const element = document.getElementById(sectionId);
            if (element) {
                const headerHeight = 80;
                const elementPosition = element.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: elementPosition,
                    behavior: 'smooth'
                });
            }
        }, 100);
    }

    scrollToTop(): void {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}