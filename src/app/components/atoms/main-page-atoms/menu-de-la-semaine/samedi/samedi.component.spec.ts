import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SamediComponent } from './samedi.component';

describe('SamediComponent', () => {
  let component: SamediComponent;
  let fixture: ComponentFixture<SamediComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SamediComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SamediComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
