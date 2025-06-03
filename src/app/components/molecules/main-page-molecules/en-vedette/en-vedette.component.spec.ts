import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ALaUneComponent } from './en-vedette.component';

describe('ALaUneComponent', () => {
  let component: ALaUneComponent;
  let fixture: ComponentFixture<ALaUneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ALaUneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ALaUneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
