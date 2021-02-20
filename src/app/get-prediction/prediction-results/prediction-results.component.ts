import { Component, Input, OnInit } from '@angular/core';
import {IntervalPrediction, PredictionResults, TriageClassPredictions} from '../types';
import {GetPredictionService} from '../get-prediction.service';
import {Subscription} from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

interface IntervalSlotPredictions {
  startDate: string;
  endDate: string;
  slots: number;
}

// TODO - get input dynamically from API
const triageClasses: string[] = ['urgent', 'semi-urgent', 'standard'];

/**
 * This component displays the prediction results of the API
 * This displays the expected slot of each triage class for each
 * prediction time interval.
 *
 * Also displays the statistical significance and standard deviation
 */
@Component({
  selector: 'app-prediction-results',
  templateUrl: './prediction-results.component.html',
  styleUrls: ['./prediction-results.component.css']
})
export class PredictionResultsComponent implements OnInit {

  triageClasses: string[];
  // table settings
  displayedIntervalColumns: string[];
  displayedtcIntervalColumns: string[] = ['intervalNo', 'startDate', 'endDate', 'slots'];
  tcIntervalPredictions: MatTableDataSource<IntervalSlotPredictions>[];
  // API response data
  @Input() predictionResults: PredictionResults;
  subscription: Subscription;
  // display this component toggle variable
  loaded = false;

  constructor(private getPredictionServce: GetPredictionService) {
    // listen to updates for this variable and then display it
    this.subscription = this.getPredictionServce.predictionResults$.subscribe(
      predictionResults => {
        this.loaded = true;
        this.predictionResults = predictionResults;
      }
    )
  }

  /**
   * Take the intervals returned from the API
   * and format them into a table format for the UI to display
   * @param intervaledSlotPredictions response from the api
   */
  translateTCIntervalToTable(intervaledSlotPredictions: TriageClassPredictions): MatTableDataSource<IntervalSlotPredictions>[] {
    const tcIntervalData = this.triageClasses.map((tc: string) => {
      const intervalData = intervaledSlotPredictions[tc].map((prediction: IntervalPrediction, index: number) => {
        const intervalSlotPrediction: IntervalSlotPredictions = {
          startDate: prediction.start_date,
          endDate: prediction.end_date,
          slots: prediction.slots
        };
        return {
          intervalNo: index + 1,
          ...intervalSlotPrediction
        }
      });
      return new MatTableDataSource(intervalData);
    })
    return tcIntervalData;
  }

  ngOnInit(): void {
    this.triageClasses = triageClasses;
    this.displayedIntervalColumns = [
      'startDate',
      'endDate',
      'arrivals',
    ]
  }

}
