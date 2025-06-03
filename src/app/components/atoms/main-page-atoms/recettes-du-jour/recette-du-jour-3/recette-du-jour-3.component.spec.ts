import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecetteDuJour3Component } from './recette-du-jour-3.component';

describe('Recette3Component', () => {
  let component: RecetteDuJour3Component;
  let fixture: ComponentFixture<RecetteDuJour3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecetteDuJour3Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecetteDuJour3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
