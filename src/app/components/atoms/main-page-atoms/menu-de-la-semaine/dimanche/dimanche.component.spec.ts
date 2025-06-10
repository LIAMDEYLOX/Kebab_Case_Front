import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DimancheComponent } from './dimanche.component';

describe('DimancheComponent', () => {
  let component: DimancheComponent;
  let fixture: ComponentFixture<DimancheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DimancheComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DimancheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
