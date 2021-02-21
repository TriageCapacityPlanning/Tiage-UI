import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  waitlist: string;
  trainingData: string;
  formMessage = '';
  numSimRuns: number;
  triageClasses = [];
  displayedColumns: string[] = ['severity', 'name', 'duration', 'proportion', 'actions'];
  historicDataFile: File;

  triageClassesEndpoint = 'http://localhost:5000/classes?';
  uploadDataEndpoint = 'http://localhost:5000/upload/past-appointments';
  constructor(private http: HttpService) { }

  getTriageClasses() {
    const queryParams = { 'clinic_id': 1 }

    this.http.get(this.triageClassesEndpoint, queryParams)
      .subscribe((response) => {
        this.triageClasses = response['classes'];
      },
        (error) => {
          console.log("Could not retrieve triage classes")
        }
      )
  }

  updateTriageClass(triageClass) {
    this.http.put(this.triageClassesEndpoint, { 'triage-class': triageClass })
      // listen to data response
      .subscribe(() => {
        console.log('Triage Class Saved')
      },
        (error) => {
          console.log('Could not save triage class changes')
        }
      )
  }

  uploadHistoricData() {
    if (this.historicDataFile) {
      let formData = new FormData();
      formData.append('clinic_id', "1");
      formData.append('upload_data', this.historicDataFile);

      this.http.put(this.uploadDataEndpoint, formData)
        .subscribe(() => {
          console.log('Historic Data Uploaded')
        },
          (error) => {
            console.log('Could not upload historic data')
          })
    }

  }

  /**
   * Set class member to the value of the file string
   * @param files some files uploaded in the UI
   */
  historicDataListener(files: FileList): void {
    if (files && files.length > 0) {
      this.historicDataFile = files.item(0);
    }
  }


  /* eslint-disable  @typescript-eslint/no-empty-function */
  ngOnInit(): void {
    this.getTriageClasses();
  }

  /**
   * Send a request to update the admin settings
   */
  requestUpdateProfile(): void {
    const endpoint = '' // TODO

    const formParams = {
      trainingData: this.trainingData,
      waitlist: this.waitlist,
      numSimRuns: this.numSimRuns
    }
    const queryParams = {}
    for (const key in formParams) {
      if (formParams[key] !== undefined) {
        queryParams[key] = formParams[key]
      }
    }
    // send form data
    this.http.post(endpoint, queryParams)
      // listen to data response
      .subscribe(() => {
        this.formMessage = 'success'
      },
        (error) => {
          console.log(queryParams)
          console.log(error)
        }
      )
  }
}
