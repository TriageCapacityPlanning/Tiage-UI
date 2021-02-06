import { PredictionResultsComponent } from './prediction-results.component';
import {Observable} from 'rxjs';
import {PredictionResults} from '../types';
import {GetPredictionService} from '../get-prediction.service';

describe('GetPredictionUserInputComponent', () => {
  let getPredictionService: GetPredictionService;
  let component: PredictionResultsComponent;
  const dummyPredictionResults: PredictionResults & { _url: string } = {
    _url: 'test',
    intervaledSlotPredictions: [{
      startDate: new Date('January 2030'),
      endDate: new Date('February 2030'),
      confidence: 95.0,
      standardDeviation: 2,
      total: 25 + 30 + 30,
      urgent: { slots: 25, marginError: 2 },
      'semi-urgent': { slots: 30, marginError: 2 },
      standard: { slots: 30, marginError: 2 },
    }, {
      startDate: new Date('January 2030'),
      endDate: new Date('March 2030'),
      confidence: 95.0,
      standardDeviation: 2,
      total: 14 + 10 + 20,
      urgent: { slots: 14, marginError: 1 },
      'semi-urgent': { slots: 10, marginError: 0.5 },
      standard: { slots: 20, marginError: 2 },
    }],
    numberIntervals: 2,
    slotPredictions: {
      startDate: new Date('January 2030'),
      endDate: new Date('March 2030'),
      confidence: 95.0,
      standardDeviation: 2,
      total: (25 + 30 + 30) + (14 + 10 + 20),
      urgent: { slots: 25 + 14, marginError: 2 },
      'semi-urgent': { slots: 30 + 10, marginError: 2 },
      standard: { slots: 30 + 20, marginError: 2 },
    }
  };

  beforeEach(() => {
    getPredictionService = new GetPredictionService();
    component = new PredictionResultsComponent(getPredictionService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be loaded after getting prediction results', () => {
    expect(component.loaded).toBe(false);
    getPredictionService.setPredictionResults(dummyPredictionResults);
    expect(component.loaded).toBe(true);
  });

  it('should correctly set prediction results', () => {
    expect(component.predictionResults).toBe(null);
    getPredictionService.setPredictionResults(dummyPredictionResults);
    expect(component.predictionResults).toBe(dummyPredictionResults);
  });

  //todo update this test once API integration exists
  it('should properly load triage classes', () => {
    expect(component.triageClasses).toBe(['urgent', 'semi-urgent', 'standard']);
  })

  it('should display correctly', () =>{
    expect(component.displayedIntervalColumns).toBe(['intervalNo',
    'startDate',
    'endDate',
    ...component.triageClasses]);
  })
});
