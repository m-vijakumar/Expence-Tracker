import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { SubscriptionService } from '../services/subscription.service';
import { Router } from '@angular/router';
import { User } from '../models/user-models';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  userId: any;
  userDataSubscription: any;
  userData = new User();
  chartData: any;
  chartOptions: any;
  transactions: any;
  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private authservice: AuthService,
    private userService: UserService,
    private subscriptionService: SubscriptionService,
    private router: Router
  ) {
    this.userId = localStorage.getItem('userId');
    console.log(localStorage.getItem('User'));
    // this.isLoggedIn$ = new Observable(true);
  }

  ngOnInit(): void {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    //Get UserData from Subscribed data
    this.userDataSubscription = this.subscriptionService.userData
      .asObservable()
      .subscribe((data) => {
        this.userData = data;
      });

    if (!(this.userData.isLoggedIn == true)) {
      console.log(this.userData.isLoggedIn == false);
      this.router.navigate(['/']);
    }

    //get all Transaction
    if(localStorage.getItem('transactionstoken')){
      const transactionsToken = localStorage.getItem('transactionstoken') || ' ';
      if(transactionsToken){
        const transactionsList: any = JSON.parse(
          atob(transactionsToken.split('.')[1])
        );
        console.log(transactionsList);
        this.transactions = transactionsList.data.transactions;
        console.log(this.transactions);
      }
    }

    this.chartData = {
      lables: ['A', 'B', 'C'],
      datasets: [
        {
          data: [21, 33, 103, 44, 22, 55]
        },
      ],
    };

    this.chartOptions = {
      cutout: '70%',
      Plugin: {
        legend: {
          lables: {
            color: textColor,
          },
        },
      },
    };

    // this.transactions = [1,2,3,4,5,6 , 7];
  }
}
