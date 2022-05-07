import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FillReviewComponent } from './fill-review.component';

describe('FillReviewComponent', () => {
  let component: FillReviewComponent;
  let fixture: ComponentFixture<FillReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FillReviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FillReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
