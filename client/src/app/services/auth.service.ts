import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
Observable
HttpClient
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient:HttpClient ) { }

  register(formData:object):Observable<any>{
    return this._HttpClient.post('http://localhost:3000/users/register',formData)
  }
  login(loginData:object):Observable<any>{
    return this._HttpClient.post('http://localhost:3000/users/signin',loginData)
    // return this._HttpClient.post('http://localhost:3000/users',loginData)
  }

  isLogged(){
 return localStorage.getItem('token')!=null;
  }

  getToken(){
    return localStorage.getItem('token')||'';
    }
}
