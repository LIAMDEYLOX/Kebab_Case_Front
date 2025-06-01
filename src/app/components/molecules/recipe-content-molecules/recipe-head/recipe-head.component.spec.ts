import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeHeadComponent } from './recipe-head.component';

describe('RecipeHeadComponent', () => {
  let component: RecipeHeadComponent;
  let fixture: ComponentFixture<RecipeHeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeHeadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
