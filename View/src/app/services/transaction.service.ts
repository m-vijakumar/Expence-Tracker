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

  private _refreshRequried = new Subject<void>();

  get RefreshRequried(){
    return this._refreshRequried;
  }
  

  setTransactionList(data:any){
    const authToken = localStorage.getItem('authToken');
    if(authToken){
      this.subscriptionService.transactionsList.next(data)
    }
  }

  getAllTransactions(){
     return this.http.get<any>(this.APIUrl+ '/all-transaction', {headers: this.authHeader}).pipe(
      map((response)=>{
        console.log("in get all transaction ")
        console.log(response)
        this.setTransactionList(response.data)
        return response
       
      })
    )
  }

  addTransaction(transaction: Transaction){
    console.log("transaction service")
    
    console.log(transaction)
    return this.http.post<any>(this.APIUrl+ '/add', transaction, { headers: this.authHeader }).pipe(
      map(async(response)=>{
        console.log(response)
        this.RefreshRequried.next();
        return response;
      })
    ) 
  }
  
  updateTransaction(transactionId : number){

  }

  deleteTransaction(transactionId : number){
    console.log("in service delete transaction")
    console.log(transactionId)
    return this.http.put<any>(this.APIUrl+ '/delete', {transactionId: transactionId}, { headers: this.authHeader }).pipe(
      map(async(response)=>{
        console.log(response)
        this.RefreshRequried.next();
        return response;
      })
    ) 
  }


}
