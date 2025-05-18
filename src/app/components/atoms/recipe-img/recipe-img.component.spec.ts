import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeImgComponent } from './recipe-img.component';

describe('RecipeImgComponent', () => {
  let component: RecipeImgComponent;
  let fixture: ComponentFixture<RecipeImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeImgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
