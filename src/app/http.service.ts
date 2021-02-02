import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient) { }

  // ban the object typing rule since http.post returns exactly an observable object
  /* eslint-disable  @typescript-eslint/ban-types */

  /**
   * Send an http post request
   * @param url The URL of the http post
   * @param body the content of the POST request
   */
  public post(url: string, body: Record<string, unknown>): Observable<Object> {
    return this.http.post(url, body);
  }
}
