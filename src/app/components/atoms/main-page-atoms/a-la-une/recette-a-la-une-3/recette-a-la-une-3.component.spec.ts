import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecetteALaUne3Component } from './recette-a-la-une-3.component';

describe('RecetteALaUne3Component', () => {
  let component: RecetteALaUne3Component;
  let fixture: ComponentFixture<RecetteALaUne3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecetteALaUne3Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecetteALaUne3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
