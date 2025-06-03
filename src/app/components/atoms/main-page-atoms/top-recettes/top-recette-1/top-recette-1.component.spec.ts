import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopRecette1Component } from './top-recette-1.component';

describe('TopRecette1Component', () => {
  let component: TopRecette1Component;
  let fixture: ComponentFixture<TopRecette1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopRecette1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopRecette1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
