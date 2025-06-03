import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecetteALaUne2Component } from './recette-a-la-une-2.component';

describe('RecetteALaUne2Component', () => {
  let component: RecetteALaUne2Component;
  let fixture: ComponentFixture<RecetteALaUne2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecetteALaUne2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecetteALaUne2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
