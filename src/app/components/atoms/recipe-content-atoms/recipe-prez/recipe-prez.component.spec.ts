import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipePrezComponent } from './recipe-prez.component';

describe('RecipePrezComponent', () => {
  let component: RecipePrezComponent;
  let fixture: ComponentFixture<RecipePrezComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipePrezComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipePrezComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
