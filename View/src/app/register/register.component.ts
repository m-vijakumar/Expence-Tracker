import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  constructor(
    public dialogbox: MatDialogRef<RegisterComponent>,
    public service: AuthService,
    private snackBar: MatSnackBar
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
    
  }
  onSubmit(form: NgForm) {
    this.service.register(form.value).subscribe((res) => {
      this.resetForm(form);
      this.snackBar.open(res.toString(), '', {
        duration: 3000,
        verticalPosition: 'top',
      });
    });
  }
}
