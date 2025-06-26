import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentZoneComponent } from './comment-zone.component';

describe('CommentZoneComponent', () => {
  let component: CommentZoneComponent;
  let fixture: ComponentFixture<CommentZoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommentZoneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
