import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebApiService } from 'src/core/services/web-api.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private api: WebApiService) { }


  getEmployees(): Observable<any>{
    return this.api.get('/employee/getallemployees');
  }

  addEmployee(json): Observable<any>{
    return this.api.post('/employee/addemployee', json);
  }

  updateEmployee(json): Observable<any>{
    return this.api.post('/employee/updateemployee', json);
  }
}