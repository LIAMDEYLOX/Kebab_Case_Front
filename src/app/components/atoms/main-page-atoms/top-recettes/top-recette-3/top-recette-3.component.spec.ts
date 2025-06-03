import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopRecette3Component } from './top-recette-3.component';

describe('TopRecette3Component', () => {
  let component: TopRecette3Component;
  let fixture: ComponentFixture<TopRecette3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopRecette3Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopRecette3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
