import { Component , OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
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
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null) form.resetForm();
    this.service.formData = {
      UserId: 0,
      UserName: '',
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
    this.service.login(form.value).subscribe((res) => {
      this.resetForm(form);
      this.snackBar.open('Welcome', '', {
        duration: 2000,
        verticalPosition: 'top',
      });
      this.router.navigate([returnUrl]);
      this.service.isLoggedIn = true;
      this.dialogbox.close();
    });
  }
}

