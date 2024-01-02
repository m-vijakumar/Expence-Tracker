import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { SubscriptionService } from '../services/subscription.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { User } from '../models/user-models';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  passwordupdate = false;
  errorMessage = "Some Error...!";
  passwordError = false;
  buttonText = "Update Password"
  buttonStatus = false;
  passwordsDoNotMatch = false;
  userData = new User();
  isLoggedIn?: boolean = false;
  username: any;
  constructor(
    private authservice: AuthService,
    private userservice: UserService,
    private subscriptionService: SubscriptionService,
    private router: Router,
    private route: ActivatedRoute
  ){
    this.authservice.isLoggedIn = false;
    
  }
  ngOnInit(): void {
    this.subscriptionService.userData
      .asObservable()
      .subscribe((data) => {
        
        this.userData = data;
      });
      console.log(this.userData)

      if (!(this.userData.isLoggedIn == true)) {
        this.router.navigate(['/']);
      }
    this.route.params.subscribe((params: Params) =>{
      this.username = params['username']
      console.log(this.username)
     
    } );
    
  }

  updatePasswordForm: FormGroup = new FormGroup({

    oldpassword: new FormControl('',  Validators.required),
    newpassword: new FormControl('', Validators.required),
    confirmpassword: new FormControl('', Validators.required)
    
  },
  )
    
  updatePassword(){
    if(!(this.updatePasswordForm.value.newpassword == this.updatePasswordForm.value.confirmpassword)){
      this.passwordsDoNotMatch = true;
    }else{
      this.passwordsDoNotMatch = false;
      this.buttonStatus = true;
      this.buttonText = "Updating...";
      var updatePasswordData = {
        oldpassword : this.updatePasswordForm.value.oldpassword,
        newpassword : this.updatePasswordForm.value.newpassword

      }
      this.userservice.updatePassword(updatePasswordData).subscribe((response)=>{

        console.log(response)
        if (response.success == true) {
        this.buttonStatus = false;
        this.buttonText = "Update Password";
        this.passwordupdate = true;
        this.passwordError = false;
        } else {

        this.buttonStatus = false;
        this.buttonText = "Update Password";
        this.passwordError = true;

        this.errorMessage = response.msg;
        }
      })
    }
  }
}
