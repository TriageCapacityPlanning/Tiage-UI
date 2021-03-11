import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
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

  public put(url: string, body: unknown): Observable<Object> {
    return this.http.put(url, body);
  }

  public get(url: string, body: any): Observable<Object> {
    const params = new HttpParams({ fromObject: body })
    return this.http.get(url, { params: params });
  }
}
