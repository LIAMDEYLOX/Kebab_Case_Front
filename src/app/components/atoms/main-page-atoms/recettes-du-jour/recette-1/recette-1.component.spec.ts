import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Recette1Component } from './recette-1.component';

describe('Recette1Component', () => {
  let component: Recette1Component;
  let fixture: ComponentFixture<Recette1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Recette1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Recette1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
