import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Recette2Component } from './recette-du-jour-2.component';

describe('Recette2Component', () => {
  let component: Recette2Component;
  let fixture: ComponentFixture<Recette2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Recette2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Recette2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
