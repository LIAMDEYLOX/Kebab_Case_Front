import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecetteALaUne1Component } from './recette-a-la-une-1.component';

describe('RecetteALaUne1Component', () => {
  let component: RecetteALaUne1Component;
  let fixture: ComponentFixture<RecetteALaUne1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecetteALaUne1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecetteALaUne1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
