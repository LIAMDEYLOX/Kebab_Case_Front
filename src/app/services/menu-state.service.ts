import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuStateService {
  private menusOpenSubject = new BehaviorSubject<boolean>(false);
  menusOpen$ = this.menusOpenSubject.asObservable();

  openMenus() {
    this.menusOpenSubject.next(true);
  }

  closeMenus() {
    this.menusOpenSubject.next(false);
  }

  toggleMenus(): void {
    this.menusOpenSubject.next(!this.menusOpenSubject.value);
  }

  getCurrentState(): boolean {
    return this.menusOpenSubject.value;
  }
}