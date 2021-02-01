import { Injectable, Input } from '@angular/core';
import { PredictionResults } from './types';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetPredictionService {

  @Input() predictionResults = new Subject<PredictionResults>();
  predictionResults$ = this.predictionResults.asObservable();

  constructor() { }

  getPredictionResults() {
    return this.predictionResults;
  }

  /**
   * Inter-component communication between user-input and prediction-results
   * @param predictionResults
   */
  setPredictionResults(predictionResults: PredictionResults) {
    this.predictionResults.next(predictionResults);
    console.log(predictionResults)
  }
}
