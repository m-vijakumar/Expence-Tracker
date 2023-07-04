import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user-models';
import { SubscriptionService } from './subscription.service';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _listeners: any;

  constructor(
    private http: HttpClient,
    private subscriptionService: SubscriptionService
  ) { }

  isLoggedIn?: boolean = false;
  formData!: User;

  readonly APIUrl = 'http://localhost:5000/api/auth';


  register(reg: User) {
    console.log(reg);
    return this.http.post<any>(this.APIUrl + '/register', reg).pipe(
      map((res) => {
      //   if (res && res.token) {
      //     localStorage.setItem('authToken', res.token);
      //     this.setUserDetails();
      //     localStorage.setItem('UserId', res.userDetails.userId);
      //     localStorage.setItem('UserName', res.userDetails.userName);
      //     this.subscriptionService.cartItemcount$.next(res.carItemCount);
      //   }
        console.log(res);
        return res;
      })
    );
  }

  listen(): Observable<any> {
    return this._listeners.asObservable();
  }
  filter(filterBy: string) {
    this._listeners.next(filterBy);
  }

  login(login: User) {
    console.log(login);
    return this.http.post<any>(this.APIUrl + '/login', login).pipe(
      map((response) => {
        console.log(response);
        if (response && response.token) {
          // localStorage.setItem('authToken', response.token);
          // this.setUserDetails();
          // localStorage.setItem('UserId', response.userDetails.userId);
          // this.cartService
          //   .getCartCount(response.userDetails.userId)
          //   .subscribe((res) => {
          //     console.log(res);
          //   });
          // this.subscriptionService.cartItemcount$.next(response.carItemCount);
        }
        console.log(response.session.user);
        return response;
      })
    );
  }
}
