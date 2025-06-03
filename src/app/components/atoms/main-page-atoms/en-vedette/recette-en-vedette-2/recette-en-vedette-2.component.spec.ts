import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecetteEnVedette2Component } from './recette-en-vedette-2.component';

describe('RecetteEnVedette2Component', () => {
  let component: RecetteEnVedette2Component;
  let fixture: ComponentFixture<RecetteEnVedette2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecetteEnVedette2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecetteEnVedette2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
