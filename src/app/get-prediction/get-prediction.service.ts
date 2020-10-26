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

  setPredictionResults(predictionResults: PredictionResults) {
    this.predictionResults.next(predictionResults);
    console.log(predictionResults)
  }
}
