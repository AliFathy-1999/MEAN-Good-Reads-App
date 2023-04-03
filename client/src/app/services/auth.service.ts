import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

}
