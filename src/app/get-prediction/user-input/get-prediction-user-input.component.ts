import { Component, Input, OnInit } from '@angular/core';
import { PredictionResults } from '../types';
import { HttpService } from '../../http-get.service';
import { GetPredictionService } from '../get-prediction.service';
import { parseParams } from '../../util';

@Component({
  selector: 'app-prediction-user-input',
  templateUrl: './get-prediction-user-input.component.html',
  styleUrls: ['./get-prediction-user-input.component.css']
})
export class GetPredictionUserInputComponent implements OnInit {

  predictionLengthInDays: string = '';
  percetageOfUrgentPatients: string = '';
  percetageOfSemiUrgentPatients: string = '';
  percetageOfStandardPatients: string = '';
  dailySlotsAvailable: string = '';

  constructor(private http: HttpService, private getPredictionService: GetPredictionService) { }

  ngOnInit(): void {
  }

  onKeyPredictionLengthInDays(event: any) {
    this.predictionLengthInDays = event.target.value;
  }

  onKeyDailySlotsAvailable(event: any) {
    this.dailySlotsAvailable = event.target.value;
  }

  onKeyUrgentPatientPercentageInput(event: any) {
    this.percetageOfUrgentPatients = event.target.value;
  }

  onKeySemiUrgentPatientPercentageInput(event: any) {
    this.percetageOfSemiUrgentPatients = event.target.value;
  }

  onKeyStandardPatientPercentageInput(event: any) {
    this.percetageOfStandardPatients = event.target.value;
  }

  getPrediction() {
    const endpoint = 'http://localhost:5000/predict';
    const queryParams: Object = parseParams({
      predictionLengthDays: this.predictionLengthInDays,
      percentageOfUrgentPatients: this.percetageOfUrgentPatients,
      dailySlotsAvailable: this.dailySlotsAvailable
    });
    const url = `${endpoint}?${queryParams}`;
    this.http.getPrediction(url)
      .subscribe((data: any) => {
        this.getPredictionService.setPredictionResults({ ...data });
      },
      (error: any) => {
        const predictionResults: PredictionResults = {
          totalPatients: 30,
          totalSlots: 10,
          expectedPatientsPerTriageClass: {
            urgent: 5,
            'semi-urgent': 3,
            standard: 22,
          },
          slotsPerTriageClass: {
            urgent: 5,
            'semi-urgent': 3,
            standard: 2,
            
          },
          patientsSeenPercentage: {
            urgent: 1,
            'semi-urgent': 1,
            standard: 0.1
          }
        }
        this.getPredictionService.setPredictionResults(predictionResults);
      }
    )
  }

}
