import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetPredictionUserInputComponent } from './get-prediction-user-input.component';

describe('GetPredictionUserInputComponent', () => {
  let component: GetPredictionUserInputComponent;
  let fixture: ComponentFixture<GetPredictionUserInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetPredictionUserInputComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetPredictionUserInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
