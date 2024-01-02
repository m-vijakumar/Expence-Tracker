import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SubscriptionService } from './subscription.service';
import { Transaction } from '../models/transaction-model';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { application, response } from 'express';
import { AppComponent } from '../app.component';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(
    private http: HttpClient,
    private subscriptionService: SubscriptionService,
    private authService: AuthService,
    private router:Router
  ) { }

  formData!: Transaction;

  readonly APIUrl = 'http://localhost:8080/api/transaction';

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

  getAllTransactions(): Promise<any>{

    var  authHeader = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('authToken'),
    });
    console.log(localStorage.getItem('authToken'))
     return this.http.get<any>(this.APIUrl+ '/all-transaction', {headers: authHeader})
     .toPromise()
     .then(response => {
      console.log("in get all transaction ")
        console.log(response.error)
        if(response.error == true){ 
          console.log("response.error == true")
          this.authService.logout().subscribe(()=>{
            this.router.navigate(['/']);
          });
        }
        this.setTransactionList(response.data)
        return response
     })

    //  .pipe(
    //   map((response)=>{
    //     console.log("in get all transaction ")
    //     console.log(response)
    //     this.setTransactionList(response.data)
    //     return response
       
    //   })
    // )
  }

  addTransaction(transaction: Transaction){
    console.log("transaction service")
    var  authHeader = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('authToken'),
    });
    console.log(transaction)
    return this.http.post<any>(this.APIUrl+ '/add', transaction, { headers: authHeader }).pipe(
      map(async(response)=>{
        console.log(response)
        if(response.error == true){ 
          console.log("response.error == true")
          this.authService.logout().subscribe(()=>{
            this.router.navigate(['/']);
          });
        }
        this.RefreshRequried.next();
        return response;
      })
    ) 
  }
  loginError(){
    console.log("login error")
  }
  updateTransaction(transaction : any){
    var  authHeader = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('authToken'),
      'Content-Type': 'application/json'
    });
    console.log(transaction)
    return this.http.put<any>(this.APIUrl+ '/update', {transaction: transaction}, { headers: authHeader }).pipe(
      map(async(response)=>{
        console.log(response)
        if(response.error == true){ 
          console.log("response.error == true")
          this.authService.logout().subscribe(()=>{
            this.router.navigate(['/']);
          });
        }
        this.RefreshRequried.next();
        return response;
      })
    ) 
  }

  deleteTransaction(transactionId : number){
    console.log("in service delete transaction")
    var  authHeader = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('authToken'),
    });
    console.log(transactionId)
    return this.http.put<any>(this.APIUrl+ '/delete', {transactionId: transactionId}, { headers: authHeader }).pipe(
      map(async(response)=>{
        console.log(response)
        if(response.error == true){ 
          console.log("response.error == true")
          this.authService.logout().subscribe(()=>{
            this.router.navigate(['/']);
          });
        }
        this.RefreshRequried.next();
        return response;
      })
    ) 
  }


}
