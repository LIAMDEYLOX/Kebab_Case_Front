import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Recette3Component } from './recette-3.component';

describe('Recette3Component', () => {
  let component: Recette3Component;
  let fixture: ComponentFixture<Recette3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Recette3Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Recette3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
