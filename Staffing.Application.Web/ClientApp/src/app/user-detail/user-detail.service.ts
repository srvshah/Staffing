import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebApiService } from './../../core/services/web-api.service';
@Injectable({
  providedIn: 'root'
})
export class UserDetailService {

  constructor(private api: WebApiService) { }

  getUser(json: any): Observable<any>{
    return this.api.get('/account/userdetail', new HttpParams().set('json', JSON.stringify(json)));
  }

  getAllUser(): Observable<any>{
    return this.api.get('/account/alluserdetail');
  }
}
