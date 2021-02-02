import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient) { }

  /**
   * Send an http post request
   * @param url The URL of the http post
   * @param body the content of the POST request
   */
  public post(url: string, body: Object) {
    return this.http.post(url, body);
  }
}
