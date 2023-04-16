import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable, Subject, map } from 'rxjs';
import { environment } from '../../../envs/environment';
import jwtDecode from 'jwt-decode';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url: string = environment.ENV_URL;
  token: string | null = this.getToken();
  userObj: any;
  user: any;

  constructor(private _HttpClient: HttpClient, private _cookieService: CookieService, private _router: Router) {
    // this.userObj = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
    // this.user = this.userObj.asObservable();
        if(this._cookieService.check('token')){
      this.saveCurrentUser()
    }
  }
currentUser = new BehaviorSubject<any>(null);
saveCurrentUser(){
  const userToken= this._cookieService.get('token');
  this.currentUser.next(jwtDecode(userToken))
}

  getUserRole(): string {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.role;
  }

  isLogged(): boolean {
    return this._cookieService.get('token') != null;
  }

  
  isLogOut(){
    return this._cookieService.delete('token');
  }
 
  LogOut():Observable<any>{
    localStorage.removeItem('user');
    this.userObj.next(null);
    this._router.navigate(['/user']);
    return this._HttpClient.get(`${this.url}/logout`);
  }

  getUserData(page: number, limit: number): Observable<any> {
    return this._HttpClient.get(`${this.url}/users?page=${page}&limit=${limit}`);
  }

  getToken(): string | null {
    return this._cookieService.get('token') || null;
  }

  register(formData: object): Observable<any> {
    return this._HttpClient.post(`${this.url}/register`, formData);
  }

  login(loginData: object): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    const options = { withCredentials: true, headers };
    return this._HttpClient.post(`${this.url}/signin`, loginData, options)
    .pipe(map((user: any)=>{
      localStorage.setItem('user',JSON.stringify(user));
      this.userObj.next(user);
      return user;
    }))
  }
}
