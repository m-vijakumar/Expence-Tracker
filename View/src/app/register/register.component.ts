import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(
    public dialogbox: MatDialogRef<RegisterComponent>,
    public service: AuthService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {}

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
  }
  onSubmit(form: NgForm) {
    const returnUrl =
      this.route.snapshot.queryParamMap.get('returnUrl') || '/dashboard';
    this.service.register(form.value).then((res) => {
      this.resetForm(form);
      console.log(res);
      if (res.success == true) {
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
          detail: res.msg,
        });
      }

      
    });
  }
}
