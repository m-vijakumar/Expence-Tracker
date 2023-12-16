import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { SubscriptionService } from '../services/subscription.service';
import { Router } from '@angular/router';
import { User } from '../models/user-models';
import { TransactionService } from '../services/transaction.service';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  userData = new User();

  chartData: any;
  chartOptions: any;
  transactions: any;
  categoryCounts: any = {};
  userDataSubscription: any;
  
  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private authservice: AuthService,
    private userService: UserService,
    private transactionService: TransactionService,
    private subscriptionService: SubscriptionService,
    private router: Router
  ) { }

 
  async ngOnInit(): Promise<void> {
    // get document text color for chart color
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    //Get UserData from Subscribed data
    this.subscriptionService.userData
      .asObservable()
      .subscribe((data) => {
        this.userData = data;
      });
      console.log(this.userData)

    if (!(this.userData.isLoggedIn == true)) {
      this.router.navigate(['/']);
    }
    await this.transactionService.getAllTransactions().subscribe((res)=>{
      console.log(res)
    })
    //get all Transaction from transactions
    this.transactionService.RefreshRequried.subscribe((res)=>{   
      this.getAllTransaction();
    })

    await this.subscriptionService.transactionsList
      .asObservable()
      .subscribe((data) => {
        this.transactions =  data.sort((a: any, b: any) => {
          const dateA = new Date(b.date).getTime();
          const dateB = new Date(a.date).getTime();
          return dateA - dateB;
        });

          data.forEach((transaction: any) => {

            const category = transaction.category;
            const totalAmount = transaction.amount || 0;
            this.categoryCounts[category] = (this.categoryCounts[category] || 0) + totalAmount;
          });
          console.log(this.categoryCounts)
          console.log(Object.values(this.categoryCounts))

          this.chartData = {
            labels: Object.keys(this.categoryCounts),
            datasets: [
                {
                    data: Object.values(this.categoryCounts)
                   
                }
            ]
        };

        this.chartOptions = {
            cutout: '65%',
            plugins: {
                legend: {
                  display: false,
                    labels: {
                        color: textColor
                    }
                }
            }
        }

      });


  }

  
  async getAllTransaction(){
    this.transactionService.getAllTransactions().subscribe((res)=>{
      console.log(res)
      
      console.log(this.transactions)
      // this.transactions = res.data;
    })
  }

  sortByAmount(){
    this.transactions.sort((a: any, b : any) =>  a.amount - b.amount)
        console.log(this.transactions)
  }
  getChartData(){
    this.categoryCounts = {};
    this.transactions.forEach((transaction: any) => {
      const category = transaction.category;
      this.categoryCounts[category] = (this.categoryCounts[category] || 0) + 1;
    });
    console.log(this.categoryCounts)
    console.log(Object.keys(this.categoryCounts))
    console.log(Object.values(this.categoryCounts))
  }
}
