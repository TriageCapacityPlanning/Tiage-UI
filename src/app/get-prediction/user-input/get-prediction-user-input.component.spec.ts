import { GetPredictionUserInputComponent } from './get-prediction-user-input.component';
import {GetPredictionService} from '../get-prediction.service';
import {FormBuilder} from '@angular/forms';
import { PredictionResults } from '../types';
import {of} from 'rxjs';

describe('GetPredictionUserInputComponent', () => {
  let httpServiceSpy: {post: jasmine.Spy};
  let getPredictionService: GetPredictionService;
  let component: GetPredictionUserInputComponent;

  beforeEach(() => {
    httpServiceSpy = jasmine.createSpyObj('HttpService', ['post']);
    getPredictionService = new GetPredictionService();
    component = new GetPredictionUserInputComponent(httpServiceSpy as any, getPredictionService, new FormBuilder())
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be submitted on user clicking submit', () =>{
    expect(component.submitted).toBe(false);
    component.getPrediction();
    expect(component.submitted).toBe(true);
  });

  it('should increase # of intervalDateRanges', ()  => {
    component.addIntervalDateRange();
    component.addIntervalDateRange();
    expect(component.intervalFormControls.length).toBe(3);
  });

  it('should decrease # of intervalDateRanges', ()  => {
    component.addIntervalDateRange();
    component.removeIntervalDateRange(1);
    expect(component.intervalFormControls.length).toBe(1);
  });

  it('should reset # of intervalDateRanges', () => {
    component.addIntervalDateRange();
    component.addIntervalDateRange();
    component.addIntervalDateRange();
    component.resetIntervalDateRange();
    expect(component.intervalFormControls.length).toBe(1);
  })

});
