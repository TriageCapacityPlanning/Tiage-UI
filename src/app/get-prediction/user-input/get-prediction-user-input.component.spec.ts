import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {GetPredictionService} from '../get-prediction.service';
import {FormBuilder} from '@angular/forms';
import { GetPredictionUserInputComponent } from './get-prediction-user-input.component';
import { DatePipe } from '@angular/common'

describe('GetPredictionUserInputComponent', () => {
  let httpServiceSpy: {post: jasmine.Spy};
  let getPredictionService: GetPredictionService;
  let component: GetPredictionUserInputComponent;

  beforeEach(() => {
    httpServiceSpy = jasmine.createSpyObj('HttpService', ['post']);
    getPredictionService = new GetPredictionService();
    component = new GetPredictionUserInputComponent(httpServiceSpy as any, getPredictionService, new FormBuilder(), new DatePipe('yyyy-MM-dd'))
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