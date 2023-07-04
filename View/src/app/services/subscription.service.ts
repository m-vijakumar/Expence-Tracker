import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { User } from '../models/user-models';
@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  constructor() { }

  userData = new BehaviorSubject<User>(new User());
}
