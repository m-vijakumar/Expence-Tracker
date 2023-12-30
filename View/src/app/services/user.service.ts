import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly APIUrl!: string;

  constructor(private http: HttpClient) {
    this.APIUrl = 'http://localhost:8080/api/user/';
  }

  registerUser(userdetails: any) {
    return this.http.post(this.APIUrl, userdetails);
  }
}
