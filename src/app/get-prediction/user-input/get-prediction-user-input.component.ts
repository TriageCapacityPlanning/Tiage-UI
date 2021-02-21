import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { PredictionResults } from '../types';
import { HttpService } from '../../http.service';
import { GetPredictionService } from '../get-prediction.service';
import { PredictionRequestBody } from './requestTypes';
import { DatePipe } from '@angular/common'

// TODO - get input dynamically from API
const triageClasses: string[] = ['Urgent', 'Semi-Urgent', 'Standard'];

/**
 * Get the user-input by building a form.
 * On click of submit button, send a prediction POST request.
 * Update any component listeners for the POST request result to
 * update other components with new information
 *
 * Form Inputs:
 * - prediction date range
 * - each interval time boundary
 * - confidence level
 * - each triage classes: window, min processing rate, time unit
 */
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
  submitted = false;
  // calendar form
  floatLabelControl = new FormControl('auto');
  // File uploa
  @ViewChild('fileInput') fileInput: ElementRef;
  fileAttr = 'Choose File';

  constructor(private http: HttpService, private getPredictionService: GetPredictionService, private fb: FormBuilder, public datepipe: DatePipe) {
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
      confidence: this.fb.control(null, [Validators.min(0), Validators.max(100)]),
      numSimRuns: this.fb.control(null, [Validators.min(1), Validators.max(1000)]),
      triageClassesOptions: this.fb.array(
        this.triageClasses.map(() => this.fb.group({
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

  /**
   * Form controls getter for the root for
   */
  get rootFormControls(): { [key: string]: AbstractControl } {
    return this.predictionForm.controls;
  }

  /**
   * Get the interval date range form values
   */
  get intervalFormControls(): FormArray {
    return <FormArray>this.rootFormControls.intervalDateRanges;
  }

  /**
   * Update the form to have another interval
   */
  addIntervalDateRange(): void {
    const formControl = this.intervalFormControls;
    formControl.push(this.fb.group({
      start: this.fb.control,
      end: this.fb.control
    }))
  }

  /**
   * Remove an interval input row
   * @param i the ith interval
   */
  removeIntervalDateRange(i: number): void {
    const formControl = this.intervalFormControls;
    formControl.removeAt(i);
  }

  /**
   * Delete all intervals but start with a default empty interval
   */
  resetIntervalDateRange(): void {
    const formControl = this.intervalFormControls;
    formControl.clear();
    this.addIntervalDateRange();
  }

  /**
   * When a csv is uploaded and this function is called, store it in a variable
   * @param files some files uploaded in the UI
   */
  csvListener(files: FileList): void {
    console.log(files);
    if (files && files.length > 0) {
      const file: File = files.item(0);
      const reader: FileReader = new FileReader();
      reader.readAsText(file);
      reader.onload = () => {
        this.csvFile = reader.result as string;
      }
    }
  }

  /**
   * on submit form, send request with all the form parameters
   */
  getPrediction(): void {
    this.submitted = true;
    const endpoint = 'http://localhost:5000/predict?';
    console.log(this.predictionForm)

    const formValues = this.predictionForm.value;

    // set the triage class query parameters
    const triageClassQueryParams = {};
    // assume in the same order as the triage class user list
    (<Record<string, unknown>[]>formValues.triageClassesOptions).forEach((triageClassOptions: {
      timeUnit: string,
      timeWindow: string,
      minServicePercent: string
    }, index: number) => {
      const paramType: string = this.triageClasses[index].toLowerCase();
      // set post request body key for min service percent
      const minServicePercentParam = `${paramType}-service-percent=`;
      let timeInWeeks: number | undefined;
      switch (triageClassOptions.timeUnit) {
        case this.week: {
          timeInWeeks = parseFloat(triageClassOptions.timeWindow);
          break;
        }
        case this.day: {
          timeInWeeks = parseFloat(triageClassOptions.timeWindow) / 7;
          break;
        }
        default: {
          timeInWeeks = parseFloat(triageClassOptions.timeWindow) / 7;
          // throw new Error('TODO')
        }
      }
      // set post request body key for service window
      const windowParam = `${paramType}-window=${timeInWeeks}`;
      // set the query parameters key-value pair
      triageClassQueryParams[minServicePercentParam] = triageClassOptions.minServicePercent;
      triageClassQueryParams[windowParam] = timeInWeeks.toString();
    })

    var intervals = [];
    formValues.intervalDateRanges.forEach(interval => {
      intervals.push([this.datepipe.transform(interval.start, 'yyyy-MM-dd'),
                      this.datepipe.transform(interval.end, 'yyyy-MM-dd')]);
    });

    console.log(formValues.confidence)
    // generate the post body
    const queryParams: PredictionRequestBody = {
      'clinic-id': 1,
      'intervals': JSON.stringify(intervals),
      'confidence': formValues.confidence || 95,
      'num-sim-runs': formValues.numSimRuns || 100
    }

    /*if (this.csvFile) {
      queryParams.waitlistcsv = this.csvFile;
    }*/
    // get the API's response
    this.http.get(endpoint, queryParams)
      // listen to data response
      .subscribe((data: PredictionResults) => {
        this.getPredictionService.setPredictionResults({ ...data });
      },
        (error) => {
          // for testing purposes just return this dummy data for now until API is ready
          console.log(error)
          const predictionResults: PredictionResults = {
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
          }
          this.getPredictionService.setPredictionResults(predictionResults);
        }
      )
  }

}
