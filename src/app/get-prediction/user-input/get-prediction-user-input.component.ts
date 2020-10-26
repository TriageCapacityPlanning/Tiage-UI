import { Component, Input, OnInit } from '@angular/core';
import { PredictionResults } from '../types';
import { HttpService } from '../../http-get.service';
import { GetPredictionService } from '../get-prediction.service';


@Component({
  selector: 'app-prediction-user-input',
  templateUrl: './get-prediction-user-input.component.html',
  styleUrls: ['./get-prediction-user-input.component.css']
})
export class GetPredictionUserInputComponent implements OnInit {

  deadlineInWeeks: string = '';
  percetageOfUrgentPatients: string = '';

  constructor(private http: HttpService, private getPredictionService: GetPredictionService) { }

  ngOnInit(): void {
  }

  onKeyDeadlineInput(event: any) {
    this.deadlineInWeeks = event.target.value;
  }

  onKeyUrgentPatientPercentageInput(event: any) {
    this.percetageOfUrgentPatients = event.target.value;
  }

  getPrediction() {
    const params: Object = {
      deadlineInWeeks: this.deadlineInWeeks,
      percentageOfUrgentPatients: this.percetageOfUrgentPatients
    };
    this.http.getPrediction(params)
      .subscribe((data: any) => {
        this.getPredictionService.setPredictionResults({ ...data });
      },
      (error: any) => {
        const predictionResults = {
          totalPatientsPerWeek: 10,
          numberSlotsNeeded: 20,
          patientsNeededByType: {
            urgent: 20
          }
        }
        this.getPredictionService.setPredictionResults(predictionResults);
      }
    )
  }

}
