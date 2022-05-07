import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContinueCreateReviewComponent } from './continue-create-review.component';

describe('ContinueCreateReviewComponent', () => {
  let component: ContinueCreateReviewComponent;
  let fixture: ComponentFixture<ContinueCreateReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContinueCreateReviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContinueCreateReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
