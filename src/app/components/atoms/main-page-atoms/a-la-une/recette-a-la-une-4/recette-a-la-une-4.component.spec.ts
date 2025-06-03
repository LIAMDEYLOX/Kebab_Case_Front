import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecetteALaUne4Component } from './recette-a-la-une-4.component';

describe('RecetteALaUne4Component', () => {
  let component: RecetteALaUne4Component;
  let fixture: ComponentFixture<RecetteALaUne4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecetteALaUne4Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecetteALaUne4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
