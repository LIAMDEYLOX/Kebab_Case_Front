import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AntiGaspiComponent } from './anti-gaspi.component';

describe('AntiGaspiComponent', () => {
  let component: AntiGaspiComponent;
  let fixture: ComponentFixture<AntiGaspiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AntiGaspiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AntiGaspiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
