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
  formMessage: string = '';
  numSimRuns: number;

  constructor(private http: HttpService) { }


  waitlistListener(files: FileList) {
    if (files && files.length > 0) {
      let file: File = files.item(0);
      let reader: FileReader = new FileReader();
      reader.readAsText(file);
      reader.onload = (e) => {
        this.waitlist = reader.result as string;
      }
    }
  }

  trainingDataListener(files: FileList) {
    if (files && files.length > 0) {
      let file: File = files.item(0);
      let reader: FileReader = new FileReader();
      reader.readAsText(file);
      reader.onload = (e) => {
        this.trainingData = reader.result as string;
      }
    }
  }

  ngOnInit() {
  }

  requestUpdateProfile() {
    const endpoint = '' // TODO

    const formParams = {
      trainingData: this.trainingData,
      waitlist: this.waitlist,
      numSimRuns: this.numSimRuns
    }
    let queryParams = {}
    for (let key in formParams) {
      if (formParams[key] !== undefined) {
        queryParams[key] = formParams[key]
      }
    }
    this.http.getPrediction(endpoint, queryParams)
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
