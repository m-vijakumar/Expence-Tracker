import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { User } from '../models/user-models';
import { Transaction } from '../models/transaction-model';
@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  constructor() { }

  userData = new BehaviorSubject<User>(new User());

  transaction = new BehaviorSubject<Transaction>(new Transaction());
}
