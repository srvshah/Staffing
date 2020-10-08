import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebApiService } from 'src/core/services/web-api.service';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {

  constructor(private api: WebApiService) { }


  getAssignments(): Observable<any>{
    return this.api.get('/assignment/getallassignments');
  }

  addAssignment(json): Observable<any>{
    return this.api.post('/assignment/addassignment', json);
  }

  updateAssignment(json): Observable<any>{
    return this.api.post('/assignment/updateassignment', json);
  }
}
