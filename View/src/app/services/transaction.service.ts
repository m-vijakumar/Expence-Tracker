import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SubscriptionService } from './subscription.service';
import { Transaction } from '../models/transaction-model';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(
    private http: HttpClient,
    private subscriptionService: SubscriptionService
  ) { }

  formData!: Transaction;

  readonly APIUrl = 'http://localhost:5000/api/transaction';

  readonly authHeader = new HttpHeaders({
    Authorization: 'Bearer ' + localStorage.getItem('authToken'),
  });

  private _listeners = new Subject<any>();
  
  listen(): Observable<any> {
    return this._listeners.asObservable();
  }

  addTransaction(transaction: Transaction){
    console.log("transaction service")
    console.log(transaction)
    return this.http.post<any>(this.APIUrl+ '/add', transaction, { headers: this.authHeader }).pipe(
      map((response)=>{
        console.log(response)
        return response;
      })
    )
  }
  
  getAllTransactions(){

  }


}
