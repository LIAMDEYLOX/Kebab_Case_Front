import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecettesDuJourComponent } from './recettes-du-jour.component';

describe('RecettesDuJourComponent', () => {
  let component: RecettesDuJourComponent;
  let fixture: ComponentFixture<RecettesDuJourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecettesDuJourComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecettesDuJourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
