import { Injectable, Input } from '@angular/core';
import { PredictionResults } from './types';
import { Subject } from 'rxjs';

/**
 * An inter-component helper class to share data
 */
@Injectable({
  providedIn: 'root'
})
export class GetPredictionService {

  @Input() predictionResults = new Subject<PredictionResults>();
  predictionResults$ = this.predictionResults.asObservable();

  getPredictionResults(): Subject<PredictionResults> {
    return this.predictionResults;
  }

  /**
   * Inter-component communication between user-input and prediction-results
   * @param predictionResults
   */
  setPredictionResults(predictionResults: PredictionResults): void {
    this.predictionResults.next(predictionResults);
    console.log(predictionResults)
  }
}
