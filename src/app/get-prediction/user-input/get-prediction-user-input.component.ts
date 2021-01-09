import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { PredictionResults } from '../types';
import { HttpService } from '../../http-get.service';
import { GetPredictionService } from '../get-prediction.service';
import { parseParams } from '../../util';

const triageClasses: string[] = ['Urgent', 'Semi-Urgent', 'Standard'];

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
  date: string = '';
  triageClasses: string[] = [];
  // form variables
  options: FormGroup;
  predictionForm: FormGroup;
  triageClassForms = new Object();
  oneDay = 24 * 60 * 60 * 1000;
  submitted: boolean = false;
  // calendar form
  floatLabelControl = new FormControl('auto');

  constructor(private http: HttpService, private getPredictionService: GetPredictionService, private fb: FormBuilder) {
    this.options = fb.group({
      floatLabel: this.floatLabelControl,
    })
  }

  ngOnInit(): void {
    this.triageClasses = triageClasses;
    // dynamically load each triage class form option
    //this.triageClassesOptions = {}
    this.predictionForm = this.fb.group({
      dateRange: this.fb.group({
        start: this.fb.control,
        end: this.fb.control
      }),
      confidence: this.fb.control('', [Validators.required, Validators.min(0), Validators.max(100)]),
      triageClassesOptions: this.fb.array(
        this.triageClasses.map((triageClass: string) => this.fb.group({
          minServicePercent: this.fb.control('', [Validators.required]),
          timeWindow: this.fb.control('', [Validators.required]),
          timeUnit: this.fb.control('', [Validators.required]),
        }))
      )
    })
    console.log(this.predictionForm.controls.triageClassesOptions)
  }

  get formControls() {
    return this.predictionForm.controls;
  }

  onKeyUpDateRange(event: any) {
    console.log(this.predictionForm)
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
