import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

export function parseParams(params: Object) {
  const queryParams: string[] = [];
  for (const key in params) {
    queryParams.push(`${key}=${params[key]}`);
  }
  return queryParams.join('&');
}

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient) { }

  public getPrediction(params: Object) {
    const endpoint = 'localhost:3000';
    const queryParams = parseParams(params);
    const url = `${endpoint}?${queryParams}`;
    return this.http.get(url);
  }
}
