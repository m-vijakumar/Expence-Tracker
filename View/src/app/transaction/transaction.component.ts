import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../services/transaction.service';
import { MatDialogRef } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit{

  constructor(
    services : TransactionService,
    public dialogbox: MatDialogRef<LoginComponent>,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute

    ){

  }
  ngOnInit(): void {
    
  }

}
