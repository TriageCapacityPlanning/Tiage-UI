import { Component, Input, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import {PredictionResults, SlotPredictions, TriageClassCount} from '../types';
import {GetPredictionService} from '../get-prediction.service';
import {Subscription} from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';


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
  displayedtcIntervalColumns: string[] = ['intervalNo', 'startDate', 'endDate', 'slots', 'stdDev'];
  summaryIntervalPredictions: MatTableDataSource<SlotPredictions>;
  tcIntervalPredictions: MatTableDataSource<SlotPredictions>[];
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
        this.summaryIntervalPredictions = this.translateSummaryIntervalsToTables(predictionResults.intervaledSlotPredictions);
        console.log('----')
        console.log(this.summaryIntervalPredictions);
        this.tcIntervalPredictions = this.translateTCIntervalToTable(predictionResults.intervaledSlotPredictions);
        console.log('----')
        console.log(this.tcIntervalPredictions);
      }
    )
  }

  /**
   * Take the intervals returned from the API
   * and format them into a table format for the UI to display
   * @param intervaledSlotPredictions response from the api
   */
  translateTCIntervalToTable(intervaledSlotPredictions: SlotPredictions[]) {
    const tcIntervalData = this.triageClasses.map((_: string, tcIndex: number) => {
      const intervalData = intervaledSlotPredictions.map((prediction: SlotPredictions, index: number) => {
        const tempPrediction: any = {};
        tempPrediction.startDate = prediction.startDate.toLocaleDateString('en-US');
        tempPrediction.endDate = prediction.endDate.toLocaleDateString('en-US');
        const triageClass = this.triageClasses[tcIndex];
        console.log(triageClass, (<TriageClassCount>prediction[triageClass]).slots)
        tempPrediction.slots = (<TriageClassCount>prediction[triageClass]).slots;
        tempPrediction.stdDev = (<TriageClassCount>prediction[triageClass]).stdDev;
        return {
          intervalNo: index + 1,
          ...tempPrediction
        }
      });
      return new MatTableDataSource(intervalData);
    })
    return tcIntervalData;
  }

  /**
   * Map API data to renderable format by putting it in table-friendly format
   * @param intervaledSlotPredictions
   */
  translateSummaryIntervalsToTables(intervaledSlotPredictions: SlotPredictions[]) {
    const intervalData = intervaledSlotPredictions.map((prediction: SlotPredictions, index: number) => {
      const tempPrediction: any = {...prediction};
      tempPrediction.startDate = tempPrediction.startDate.toLocaleDateString('en-US');
      tempPrediction.endDate = tempPrediction.endDate.toLocaleDateString('en-US');
      return {
        intervalNo: index + 1,
        ...tempPrediction
      }
    });
    return new MatTableDataSource(intervalData);
  }
  ngOnInit() {
    this.triageClasses = triageClasses;
    this.displayedIntervalColumns = [
      'intervalNo',
      'startDate',
      'endDate',
      ...this.triageClasses
    ]
  }

}
