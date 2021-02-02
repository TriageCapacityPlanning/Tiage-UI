import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class UserProfileComponent implements OnInit {
  waitlist: string;
  trainingData: string;
  formMessage = '';
  numSimRuns: number;

  constructor(private http: HttpService) { }


  /**
   * Set class member to the value of the file string
   * @param files 
   */
  waitlistListener(files: FileList) {
    if (files && files.length > 0) {
      const file: File = files.item(0);
      const reader: FileReader = new FileReader();
      reader.readAsText(file);
      reader.onload = (e) => {
        this.waitlist = reader.result as string;
      }
    }
  }

  /**
   * Set class member to the value of the file string
   * @param files 
   */
  trainingDataListener(files: FileList) {
    if (files && files.length > 0) {
      const file: File = files.item(0);
      const reader: FileReader = new FileReader();
      reader.readAsText(file);
      reader.onload = (e) => {
        this.trainingData = reader.result as string;
      }
    }
  }

  ngOnInit() {
  }

  /**
   * Send a request to update the admin settings
   */
  requestUpdateProfile() {
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
      .subscribe((data: any) => {
        this.formMessage = 'success'
      },
        (error: any) => {
          console.log(queryParams)
        }
      )
  }

}
