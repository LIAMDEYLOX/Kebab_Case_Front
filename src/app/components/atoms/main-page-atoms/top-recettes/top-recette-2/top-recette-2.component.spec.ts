import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopRecette2Component } from './top-recette-2.component';

describe('TopRecette2Component', () => {
  let component: TopRecette2Component;
  let fixture: ComponentFixture<TopRecette2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopRecette2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopRecette2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
