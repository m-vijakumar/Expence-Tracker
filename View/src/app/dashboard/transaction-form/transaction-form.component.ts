import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Transaction } from 'src/app/models/transaction-model';
import { User } from 'src/app/models/user-models';
import { SubscriptionService } from 'src/app/services/subscription.service';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.css']
})
export class TransactionFormComponent  {
  @Input() transaction = new Transaction();
  @Output() sendTransactionData = new EventEmitter<string[]>();

    
  userData = new User();
  constructor(
    public service : TransactionService,
    private snackBar: MatSnackBar,
    private subscriptionService: SubscriptionService,

    ){

  }
  stateOptions: any[] = [
    { label: 'Income', value: 'income' },
    { label: 'Expense', value: 'expense' }
];

categories = ['Travel', 'Grocery', 'Rent', 'Mortgages', 'Entertainment', 'Insurance', 'Others' ]
  ngOnInit(): void {
    this.transactionForm.reset()

    console.log(this.transaction)
    this.transactionForm.patchValue(this.transaction);

    this.subscriptionService.userData
      .asObservable()
      .subscribe((data) => {
        
        this.userData = data;
      });
      console.log(this.userData)
  }
 
  transactionForm: FormGroup = new FormGroup({
    description: new FormControl(''),
    type: new FormControl(''),
    amount: new FormControl(),
    category: new FormControl(''),
    date: new FormControl()
    
  })
  
  //Using Reactive form to update Transaction
  updateTransactionData(){
    this.sendTransactionData.emit(  this.transactionForm.value )


  }

}
