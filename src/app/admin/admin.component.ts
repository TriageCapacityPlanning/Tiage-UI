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

  constructor(private http: HttpService) { }

  /**
   * Set class member to the value of the file string
   * @param files some files uploaded in the UI
   */
  waitlistListener(files: FileList): void {
    if (files && files.length > 0) {
      const file: File = files.item(0);
      const reader: FileReader = new FileReader();
      reader.readAsText(file);
      reader.onload = () => {
        this.waitlist = reader.result as string;
      }
    }
  }

  /**
   * Set class member to the value of the file string
   * @param files some files uploaded in the UI
   */
  trainingDataListener(files: FileList): void {
    if (files && files.length > 0) {
      const file: File = files.item(0);
      const reader: FileReader = new FileReader();
      reader.readAsText(file);
      reader.onload = () => {
        this.trainingData = reader.result as string;
      }
    }
  }

  /* eslint-disable  @typescript-eslint/no-empty-function */
  ngOnInit(): void {
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
