import { Component, Input, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormControl, Validators, Form} from '@angular/forms';
import { PredictionResults } from '../types';
import { HttpService } from '../../http-get.service';
import { GetPredictionService } from '../get-prediction.service';
import { PredictionRequestBody } from './requestTypes';

// TODO - get input dynamically from API
const triageClasses: string[] = ['Urgent', 'Semi-Urgent', 'Standard'];

@Component({
  selector: 'app-prediction-user-input',
  templateUrl: './get-prediction-user-input.component.html',
  styleUrls: ['./get-prediction-user-input.component.css']
})
export class GetPredictionUserInputComponent implements OnInit {

  triageClasses: string[] = [];
  // api request parameters
  csvFile: string;

  // form constants
  week = 'week';
  day = 'day';

  // form variables
  options: FormGroup;
  predictionForm: FormGroup;
  triageClassForms = new Object();
  oneDay = 24 * 60 * 60 * 1000;
  submitted: boolean = false;
  // calendar form
  floatLabelControl = new FormControl('auto');
  // File uploa
  @ViewChild('fileInput') fileInput: ElementRef;
  fileAttr = 'Choose File';

  constructor(private http: HttpService, private getPredictionService: GetPredictionService, private fb: FormBuilder) {
    this.options = fb.group({
      floatLabel: this.floatLabelControl,
    })
  }

  ngOnInit(): void {
    this.triageClasses = triageClasses;
    // dynamically load each triage class form option
    this.predictionForm = this.fb.group({
      predictionDateRange: this.fb.group({
        start: this.fb.control,
        end: this.fb.control
      }),
      confidence: this.fb.control(null, [Validators.required, Validators.min(0), Validators.max(100)]),
      triageClassesOptions: this.fb.array(
        this.triageClasses.map((triageClass: string) => this.fb.group({
          minServicePercent: this.fb.control('', [Validators.required]),
          timeWindow: this.fb.control('', [Validators.required]),
          timeUnit: this.fb.control('', [Validators.required]),
        }))
      ),
      intervalDateRanges: this.fb.array([])
    })
    this.addIntervalDateRange();
    console.log(this.predictionForm)
  }

  // Form controls
  get rootFormControls() {
    return this.predictionForm.controls;
  }

  get intervalFormControls() {
    return <FormArray>this.rootFormControls.intervalDateRanges;
  }

  addIntervalDateRange() {
    const formControl = this.intervalFormControls;
    formControl.push(this.fb.group({
      start: this.fb.control,
      end: this.fb.control
    }))
  }

  removeIntervalDateRange(i: number) {
    const formControl = this.intervalFormControls;
    formControl.removeAt(i);
  }

  resetIntervalDateRange(i: number) {
    const formControl = this.intervalFormControls;
    formControl.clear();
    this.addIntervalDateRange();

  }

  csvListener(files: FileList){
    console.log(files);
    if(files && files.length > 0) {
       let file : File = files.item(0); 
         console.log(file.name);
         console.log(file.size);
         console.log(file.type);
         let reader: FileReader = new FileReader();
         reader.readAsText(file);
         reader.onload = (e) => {
            this.csvFile = reader.result as string;
            console.log(this.csvFile);
         }
      }
  }

  getPrediction() {
    this.submitted = true;
    const endpoint = 'http://localhost:5000/predict?';
    console.log(this.predictionForm)

    const formValues = this.predictionForm.value;

    // set the triage class query parameters
    const triageClassQueryParams = {};
    // assume in the same order as the triage class user list
    (<Object[]>formValues.triageClassesOptions).forEach((triageClassOptions: {
      timeUnit: string,
      timeWindow: string,
      minServicePercent: string
    }, index: number) => {
      const paramType: string = this.triageClasses[index].toLowerCase();
      // set post request body key for min service percent
      const minServicePercentParam: string = `${paramType}-service-percent=`;
      let timeInWeeks: number | undefined;
      switch (triageClassOptions.timeUnit) {
        case this.week: {
          timeInWeeks = parseFloat(triageClassOptions.timeWindow);
          break;
        }
        case this.day: {
          timeInWeeks = parseFloat(triageClassOptions.timeWindow)/7;
          break;
        }
        default: {
          timeInWeeks = parseFloat(triageClassOptions.timeWindow)/7;
          // throw new Error('TODO')
        }
      }
      // set post request body key for service window
      const windowParam: string = `${paramType}-window=${timeInWeeks}`;
      // set the query parameters key-value pair
      triageClassQueryParams[minServicePercentParam] = triageClassOptions.minServicePercent;
      triageClassQueryParams[windowParam] = timeInWeeks.toString();
    })


    const queryParams: PredictionRequestBody = {
      'start-date': formValues.predictionDateRange.start,
      'end-date': formValues.predictionDateRange.end,
      'confidence': formValues.confidence || 95,
      'num-sim-runs': formValues.numSimRuns || 1000,
      ...triageClassQueryParams
    }

    if (this.csvFile) {
      queryParams.waitlistcsv = this.csvFile;
    }
    const url = `${endpoint}?${queryParams}`;
    this.http.getPrediction(url, queryParams)
      .subscribe((data: any) => {
        this.getPredictionService.setPredictionResults({ ...data });
      },
      (error: any) => {
        const predictionResults: PredictionResults & {_url: string}= {
          _url: 'test',
          intervaledSlotPredictions: [{
            startDate: new Date('January 2030'),
            endDate: new Date('February 2030'),
            confidence: 95.0,
            standardDeviation: 2,
            total: 25 + 30 + 30,
            urgent: { slots: 25, stdDev: 2},
            'semi-urgent': { slots: 30, stdDev: 2},
            standard: { slots: 30, stdDev: 2},
          }, {
            startDate: new Date('January 2030'),
            endDate: new Date('March 2030'),
            confidence: 95.0,
            standardDeviation: 2,
            total: 14 + 10 + 20,
            urgent: { slots: 14, stdDev: 1},
            'semi-urgent': { slots: 10, stdDev: 0.5},
            standard: { slots: 20, stdDev: 2},
          }],
          numberIntervals: 2,
          slotPredictions: {
            startDate: new Date('January 2030'),
            endDate: new Date('March 2030'),
            confidence: 95.0,
            standardDeviation: 2,
            total: (25 + 30 + 30)+(14 + 10 + 20),
            urgent: { slots: 25 + 14, stdDev: 2},
            'semi-urgent': { slots: 30 + 10, stdDev: 2},
            standard: { slots: 30 + 20, stdDev: 2},
          }

        }
        this.getPredictionService.setPredictionResults(predictionResults);
      }
    )
  }

}
