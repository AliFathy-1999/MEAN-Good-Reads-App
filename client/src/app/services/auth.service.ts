import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token: string | null = this.getToken();

  // logged= new BehaviorSubject(false);
  // logged$ = this.logged.asObservable()

  private logged = false;
  private loggedSubject = new Subject<boolean>();

  constructor(private _HttpClient: HttpClient, private _cookieService: CookieService) {}

 
  LogOut(){
    return this._cookieService.delete('logged');
  }



  getUserData(page:number,limit:number):Observable<any>{
    return this._HttpClient.get(`http://localhost:3000/users?page=${page}&limit=${limit}`)
  }

  getToken(): string | null {
    return this._cookieService.get('token') || null;
  }

  register(formData: object): Observable<any> {
    return this._HttpClient.post('http://localhost:3000/register', formData);
  }


  login(loginData: object): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
     const success = true;  
    if (success) {
      this.logged = true;
      this.loggedSubject.next(true);
    }
    return this._HttpClient.post('http://localhost:3000/signin', loginData,{ headers});
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedSubject.asObservable();
  }

}
