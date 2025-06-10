import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendrediComponent } from './vendredi.component';

describe('VendrediComponent', () => {
  let component: VendrediComponent;
  let fixture: ComponentFixture<VendrediComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendrediComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendrediComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
