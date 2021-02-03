import { GetPredictionUserInputComponent } from './get-prediction-user-input.component';
import {GetPredictionService} from '../get-prediction.service';
import {FormBuilder} from '@angular/forms';

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
});
