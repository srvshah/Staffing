import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebApiService } from 'src/core/services/web-api.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private api: WebApiService) { }


  getCustomers(): Observable<any>{
    return this.api.get('/customer/getallcustomers');
  }

  addCustomer(json): Observable<any>{
    return this.api.post('/customer/addcustomer', json);
  }

  updateCustomer(json): Observable<any>{
    return this.api.post('/customer/updatecustomer', json);
  }
}