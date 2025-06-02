import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuDeLaSemaineComponent } from './menu-de-la-semaine.component';

describe('MenuDeLaSemaineComponent', () => {
  let component: MenuDeLaSemaineComponent;
  let fixture: ComponentFixture<MenuDeLaSemaineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuDeLaSemaineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuDeLaSemaineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
