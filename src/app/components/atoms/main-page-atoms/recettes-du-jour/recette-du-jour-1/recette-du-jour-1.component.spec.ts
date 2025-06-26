import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecetteDuJour1Component } from './recette-du-jour-1.component';

describe('RecetteDuJour1Component', () => {
  let component: RecetteDuJour1Component;
  let fixture: ComponentFixture<RecetteDuJour1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecetteDuJour1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecetteDuJour1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
