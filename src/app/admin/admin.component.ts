import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class UserProfileComponent implements OnInit {
  waitlist: string;
  trainingData: string;

  constructor() { }


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

}
