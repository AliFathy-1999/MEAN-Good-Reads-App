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
<<<<<<< HEAD
    // return this._HttpClient.post('http://localhost:3000/users',loginData)
  }

  isLogged(){
 return localStorage.getItem('token')!=null;
  }

  getToken(){
    return localStorage.getItem('token')||'';
    }
=======
  }

>>>>>>> a0f18f00090b5719da4c21bf63b0723e0c7575c0
}
