import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebApiService } from './../../core/services/web-api.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private api: WebApiService) {
  }

  getLogin(json: any): Observable<any>{
    return this.api.post('/account/login', json);
  }
}