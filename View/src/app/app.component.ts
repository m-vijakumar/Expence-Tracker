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
import { MenuItem, MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  userData = new User();
  isLoggedIn?: boolean = false;
  items: MenuItem[] | undefined;

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private authservice: AuthService,
    private userService: UserService,
    private subscriptionService: SubscriptionService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.authservice.isLoggedIn = false;
  }

  ngOnInit(): void {
    //check auth token from local storage and add data to subscription user data
    if (localStorage.getItem('authToken')) {
      const authToken = localStorage.getItem('authToken') || ' ';
      if (authToken) {
        const decodeUserDetails: any = JSON.parse(
          atob(authToken.split('.')[1])
        );
        console.log(decodeUserDetails);

        
        // update the User Scbscription Data 
        this.subscriptionService.userData.next({
          userId: decodeUserDetails.data.id,
          userName: decodeUserDetails.data.username,
          isLoggedIn: true,
          email: decodeUserDetails.data.email,
          password: undefined
        });
      }
    }

    // Subscribe the User Subscription Data.
    this.subscriptionService.userData
      .asObservable()
      .subscribe((data) => {
        
        this.userData = data;
      });
      console.log(this.userData)

      this.items = [
        {
          label: this.userData.userName,
          items: [
            {
              label: 'Dashboard',
              icon: 'pi pi-wallet',
              command: () => {
                // this.update();
                this.router.navigate(['/dashboard']);
              },
            },
            {
              label: 'Edit Account',
              icon: 'pi pi-user-edit',
              command: () => {
                // this.update();
                this.router.navigate(['/user', this.userData.userName]);
              },
            },
            {
              label: 'Logout',
              icon: 'pi pi-sign-out',
              command: () => {
                this.onLogout();
              },
            },
          ],
        },
      ];
      
    // checking user is LoggedIn or Not
    if (this.userData.isLoggedIn == true) {
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
    this.authservice.logout().subscribe(async(res) => {
      this.router.navigate(['/']);
      this.messageService.add({
        severity: 'success',
        detail: 'Thank You',
      });
      
    });
  }

  // items for toolbar (UserName)

}
