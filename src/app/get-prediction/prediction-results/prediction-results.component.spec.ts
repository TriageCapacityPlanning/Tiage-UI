import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {PredictionResults} from '../types';
import {GetPredictionService} from '../get-prediction.service';
import { PredictionResultsComponent } from './prediction-results.component';

describe('GetPredictionUserInputComponent', () => {
  let getPredictionService: GetPredictionService;
  let component: PredictionResultsComponent;
  const dummyPredictionResults: PredictionResults = {
    _url: 'test',
    predictions: {
      urgent: [
        {
          slots: 25,
          start_date: '2030-01-01',
          end_date: '2030-02-01'
        },
        {
          slots: 14,
          start_date: '2030-02-02',
          end_date: '2030-03-01'
        }
      ],
      'semi-urgent': [
        {
          slots: 30,
          start_date: '2030-01-01',
          end_date: '2030-02-01'
        },
        {
          slots: 10,
          start_date: '2030-02-02',
          end_date: '2030-03-01'
        }
      ],
      standard: [
        {
          slots: 30,
          start_date: '2030-01-01',
          end_date: '2030-02-01'
        },
        {
          slots: 10,
          start_date: '2030-02-02',
          end_date: '2030-03-01'
        }
      ]
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

  it('should properly load triage classes', () => {
    expect(component.triageClasses).toBe(['urgent', 'semi-urgent', 'standard']);
  })

  it('should display correctly', () =>{
    expect(component.displayedIntervalColumns).toBe(['intervalNo',
    'startDate',
    'endDate',
  'slots']);
  })
});

