import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopRecettesComponent } from './top-recettes.component';

describe('TopRecettesComponent', () => {
  let component: TopRecettesComponent;
  let fixture: ComponentFixture<TopRecettesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopRecettesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopRecettesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
