import { Component , OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
constructor(
    public dialogbox: MatDialogRef<LoginComponent>,
    public service: AuthService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService
  ){}

  ngOnInit(): void {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null) form.resetForm();
    this.service.formData = {
      userId: 0,
      userName: '',
      email: '',
      password: '',
    };
  }

  onClose() {
    this.dialogbox.close();
    this.service.filter('Register click');
  }

  onSubmit(form: NgForm) {
    const returnUrl =
      this.route.snapshot.queryParamMap.get('returnUrl') || '/dashboard';
    this.service.login(form.value).subscribe((res) => {
      console.log("Asdas" + res)
      this.resetForm(form);
      if(res.error == false){
        this.messageService.add({
          severity: 'success',
          detail: "Welcome",
        });
        this.router.navigate([returnUrl]);
        this.service.isLoggedIn = true;
        this.dialogbox.close();
      }else{
        this.messageService.add({
          severity: 'error',
          detail: "Incorrect Email or Password",
        });
      }
      
    });
  }
}

