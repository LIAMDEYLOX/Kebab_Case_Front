import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecetteEnVedette1Component } from './recette-en-vedette-1.component';

describe('RecetteEnVedette1Component', () => {
  let component: RecetteEnVedette1Component;
  let fixture: ComponentFixture<RecetteEnVedette1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecetteEnVedette1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecetteEnVedette1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
