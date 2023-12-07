import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { SubscriptionService } from './services/subscription.service';
import { User } from './models/user-models';

import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  userId: any;
  userDataSubscription: any;
  authdata:any;
  userData = new User();
  title = 'Expence Tracker';
  isLoggedIn?: boolean = false;
  UserName = new Observable<string>(undefined);
  myControl = new FormControl();

  filteredOptions!: Observable<string[]>;
  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private authservice: AuthService,
    private userService: UserService,
    private subscriptionService: SubscriptionService,
    private router: Router
  ) {
    this.userId = localStorage.getItem('userId');
    console.log(localStorage.getItem('authToken'));
    this.authservice.isLoggedIn = false;
  }
  ngOnInit(): void {
    if (localStorage.getItem('authToken')) {
      const authToken = localStorage.getItem('authToken') || ' ';
      if (authToken) {
        const decodeUserDetails: any = JSON.parse(
          atob(authToken.split('.')[1])
        );
        console.log(decodeUserDetails)
        this.userData.UserId = decodeUserDetails.data.id;
        this.userData.UserName = decodeUserDetails.username;
        this.userData.isLoggedIn = true;
        
        this.subscriptionService.userData.next(this.userData);
        }
    }
    this.userDataSubscription = this.subscriptionService.userData
      .asObservable()
      .subscribe((data) => {
        
        this.userData = data;
      });
    console.log(this.userData);

    if (!(this.userData.isLoggedIn == true)) {
      console.log(this.userData.isLoggedIn == false)
      this.router.navigate(['/dashboard']);
    }
  }

  onLogin() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '40%';

    this.dialog.open(LoginComponent, dialogConfig);
  }

  onRegister() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '40%';
    this.dialog.open(RegisterComponent, dialogConfig);
  }

  onLogout() {
    this.authservice.logout();
    this.router.navigate(['/']);
    this.snackBar.open('logout', '', {
      duration: 3000,
      verticalPosition: 'top',
    });
    // this.router.navigate(['/login']);
  }


}
