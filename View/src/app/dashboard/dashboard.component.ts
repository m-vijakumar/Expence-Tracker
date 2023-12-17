import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { SubscriptionService } from '../services/subscription.service';
import { Router } from '@angular/router';
import { User } from '../models/user-models';
import { TransactionService } from '../services/transaction.service';
import { Subject } from 'rxjs';
import { MenuItem } from 'primeng/api';


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
  categoryCounts: any;
  balance: any;
  userDataSubscription: any;
  showIcons = false;

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private authservice: AuthService,
    private userService: UserService,
    private transactionService: TransactionService,
    private subscriptionService: SubscriptionService,
    private router: Router
  ) { 

    this.categoryCounts= {};
  this.balance={};
  }

 
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

    console.log(localStorage.getItem('authToken'))
    await this.transactionService.getAllTransactions().then(async(res)=>{
      console.log(res)
    })
    //get all Transaction from transactions
    this.transactionService.RefreshRequried.subscribe(async(res)=>{   
      await this.getAllTransaction();
    })

    console.log("in line 66")
    
    this.subscriptionService.transactionsList
      .asObservable()
      .subscribe(async(data) => {
        
        console.log("number of calls")
        this.balance ={};
        this.categoryCounts={};
        data.forEach(async(transaction: any) => {

          const type = transaction.type;
          const balanceAmount = transaction.amount || 0;
          const category = transaction.category;
          const totalAmount = transaction.amount || 0;
          
          this.balance[type] = (this.balance[type] || 0) + balanceAmount;
          this.categoryCounts[category] = (this.categoryCounts[category] || 0) + totalAmount;
          
        });
        
        this.transactions =  data.sort((a: any, b: any) => {
          const dateA = new Date(b.date).getTime();
          const dateB = new Date(a.date).getTime();
          return dateA - dateB;
        });

          console.log(this.categoryCounts)
          console.log(this.balance)
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
    await this.transactionService.getAllTransactions().then((res)=>{
      console.log(res)
      
      console.log(this.transactions)
      // this.transactions = res.data;
    })
  }

  sortByAmount(){
    this.transactions.sort((a: any, b : any) =>  a.amount - b.amount)
        console.log(this.transactions)
  }
  // getChartData(){
  //   data.forEach((transaction: any) => {

  //     const type = transaction.type;
  //     const balanceAmount = transaction.amount || 0;
  //     const category = transaction.category;
  //     const totalAmount = transaction.amount || 0;
  //     this.categoryCounts[category] = (this.categoryCounts[category] || 0) + totalAmount;
  //     this.balance[type] = (this.balance[type] || 0) + balanceAmount;
  //   });
    
  //   this.transactions =  data.sort((a: any, b: any) => {
  //     const dateA = new Date(b.date).getTime();
  //     const dateB = new Date(a.date).getTime();
  //     return dateA - dateB;
  //   });

       
  //     console.log(this.categoryCounts)
  //     console.log(this.balance)
  //     console.log(Object.values(this.categoryCounts))

  // }
  updateTransaction(transaction:any){
    console.log("in update Transaction")
    console.log(transaction)
  }
  deleteTransaction(transaction:any){
    this.transactionService.deleteTransaction(transaction._id).subscribe((res)=>{

    })
    console.log("in delete Transaction")
    console.log(transaction)
  }
}
