import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecetteEnVedette4Component } from './recette-en-vedette-4.component';

describe('RecetteEnVedette4Component', () => {
  let component: RecetteEnVedette4Component;
  let fixture: ComponentFixture<RecetteEnVedette4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecetteEnVedette4Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecetteEnVedette4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
