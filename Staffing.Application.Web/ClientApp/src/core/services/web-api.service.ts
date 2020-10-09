import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebApiService {

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {

  }

  get(url: string, params?: HttpParams): Observable<any>{
    return this.http.get(this.apiUrl + url, {params});
  }

  post(url: string, body: any): Observable<any>{
    return this.http.post(this.apiUrl + url, body);
  }

}
