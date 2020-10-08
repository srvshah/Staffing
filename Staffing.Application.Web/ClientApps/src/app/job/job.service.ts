import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebApiService } from 'src/core/services/web-api.service';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private api: WebApiService) { }


  getJobs(): Observable<any>{
    return this.api.get('/job/getalljobs');
  }

  addJob(json): Observable<any>{
    return this.api.post('/job/addjob', json);
  }

  updateJob(json): Observable<any>{
    return this.api.post('/job/updatejob', json);
  }
}