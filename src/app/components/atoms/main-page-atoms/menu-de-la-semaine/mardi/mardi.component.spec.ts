import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MardiComponent } from './mardi.component';

describe('MardiComponent', () => {
  let component: MardiComponent;
  let fixture: ComponentFixture<MardiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MardiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MardiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
