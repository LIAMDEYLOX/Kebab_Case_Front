import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterNavUpComponent } from './footer-nav-up.component';

describe('FooterNavUpComponent', () => {
  let component: FooterNavUpComponent;
  let fixture: ComponentFixture<FooterNavUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterNavUpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterNavUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
