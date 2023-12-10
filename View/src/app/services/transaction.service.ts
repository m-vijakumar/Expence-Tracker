import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SubscriptionService } from './subscription.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(
    private http: HttpClient,
    private subscriptionService: SubscriptionService
  ) { }

  readonly APIUrl = 'http://localhost:5000/api/transaction';

  setTransactionsDetails() {
    
    const transactionsToken = localStorage.getItem('transactionstoken')
    console.log(" transactionstoken "+ localStorage.getItem('transactionstoken'));
    if (transactionsToken) {
      
      // const userDetails = new User();
      const decodeUserDetails: any = JSON.parse(
        atob(transactionsToken.split('.')[1])
      );
      console.log(decodeUserDetails.data)
      // console.log(decodeUserDetails);
      // userDetails.userId = decodeUserDetails.data.id;
      // userDetails.userName = decodeUserDetails.data.username;
      // userDetails.isLoggedIn = true;

      // this.subscriptionService.userData.next(userDetails);

    }

  }
  
  getAllTransactions(){

  }


}
