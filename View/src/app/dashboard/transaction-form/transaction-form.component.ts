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
  @Input() selectedTransaction: any = null;
  // @Output() sendTransactionData = new EventEmitter<string[]>();

    
  userData = new User();
  constructor(
    public service : TransactionService,
    private snackBar: MatSnackBar,
    private subscriptionService: SubscriptionService,
    private transactionService: TransactionService,
    
    ){

  }
  stateOptions: any[] = [
    { label: 'Income', value: 'income' },
    { label: 'Expense', value: 'expense' }
];

categories = ['Travel', 'Grocery', 'Rent', 'Mortgages', 'Entertainment', 'Insurance', 'Others' ]
  ngOnInit(): void {
    this.transactionForm.reset()

    // console.log(this.selectedTransaction)
    // this.transactionForm.patchValue(this.selectedTransaction);
  }
  ngOnChanges(): void {
    if(this.selectedTransaction){
      this.selectedTransaction.date = new Date(this.selectedTransaction.date);
    }
   
    console.log(this.selectedTransaction)
    this.transactionForm.patchValue(this.selectedTransaction);
    // this.transactionForm.patchValue(date: this.selectedTransaction);
  }
 
  transactionForm: FormGroup = new FormGroup({
    description: new FormControl(''),
    type: new FormControl(''),
    amount: new FormControl(),
    category: new FormControl(''),
    date: new FormControl(new Date())
    
  })
  
  //Using Reactive form to update Transaction
  updateTransaction(){
    console.log(this.transactionForm.value)
    var transactionData = this.transactionForm.value;
    transactionData.id = this.selectedTransaction._id;
    console.log(transactionData)
    this.transactionService.updateTransaction(transactionData).subscribe(()=>{

    })
    // this.sendTransactionData.emit(  this.transactionForm.value )


  }

}
