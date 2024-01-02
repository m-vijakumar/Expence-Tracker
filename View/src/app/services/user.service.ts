import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly APIUrl!: string;

  constructor(private http: HttpClient) {
    this.APIUrl = 'http://localhost:8080/api/user/';
  }

  updatePassword(passwordData: any) {
    
    var  authHeader = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('authToken'),
    });
    return this.http.put<any>(this.APIUrl + 'update-password', passwordData,{ headers: authHeader } ).pipe(
      map((response)=>{
        console.log(response)
        return response;
      })
    );
  }
}
