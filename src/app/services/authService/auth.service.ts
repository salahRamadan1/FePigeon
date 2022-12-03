import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl: string = ' http://localhost:3000/user/';
  constructor(private _HttpClient: HttpClient, private _Router: Router) {
    if (localStorage.getItem('userToken') != null) {
      this.setUser();
    } else {
      this.logOutFromApp();
    }
  }
  token:string = JSON.stringify( localStorage.getItem('userToken'))
  user = new BehaviorSubject(null);
  setUser() {
    let token = localStorage.getItem('userToken');
    let decode: any = jwt_decode(<string>token);

    this.user.next(decode);
  }
  logOutFromApp() {
    localStorage.removeItem('userToken');
    this.user.next(null);
    this._Router.navigate(['/login']);
  }
  register(obj: any): Observable<any> {
    return this._HttpClient.post(this.baseUrl + 'signUp', obj);
  }
  login(obj: any): Observable<any> {
    return this._HttpClient.post(this.baseUrl + 'signIn', obj);
  }
  proFilePic(obj: any): Observable<any> {
    return this._HttpClient.patch( this.baseUrl+  '/changeProfilePic', obj);
  }
  // ***********
}
