import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';
Observable
HttpClient
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient:HttpClient,private _cookieService:CookieService) { }

  register(formData:object):Observable<any>{
    return this._HttpClient.post('http://localhost:3000/users/register',formData)
  }
  login(loginData:object):Observable<any>{
    return this._HttpClient.post('http://localhost:3000/users/signin',loginData)
    // return this._HttpClient.post('http://localhost:3000/users',loginData)
  }

  isLogged(){
return this._cookieService.get('token')!=null;
  }

  getToken(){
    return this._cookieService.get('token')||'';

    }
}
