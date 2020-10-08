import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebApiService } from 'src/core/services/web-api.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  constructor(private api: WebApiService) { }


  getTransactions(): Observable<any>{
    return this.api.get('/transaction/getalltransactions');
  }

  addTransaction(json): Observable<any>{
    return this.api.post('/transaction/addtransaction', json);
  }

}
