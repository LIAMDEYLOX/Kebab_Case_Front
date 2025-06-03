import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecetteEnVedette3Component } from './recette-en-vedette-3.component';

describe('RecetteEnVedette3Component', () => {
  let component: RecetteEnVedette3Component;
  let fixture: ComponentFixture<RecetteEnVedette3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecetteEnVedette3Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecetteEnVedette3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
