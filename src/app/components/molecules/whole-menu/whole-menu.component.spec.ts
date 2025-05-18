import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WholeMenuComponent } from './whole-menu.component';

describe('WholeMenuComponent', () => {
  let component: WholeMenuComponent;
  let fixture: ComponentFixture<WholeMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WholeMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WholeMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
