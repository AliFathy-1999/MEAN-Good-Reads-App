import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token: string | null = this.getToken();
  constructor(private _HttpClient: HttpClient, private _cookieService: CookieService) {}

  isLogged(): boolean {
    return this._cookieService.get('token') != null;
  }
  LogOut(){
    return this._cookieService.delete('token');
  }


  getUserData(page:number,limit:number):Observable<any>{
    return this._HttpClient.get(`http://localhost:3000/users?page=${page}&limit=${limit}`)
  }

  getToken(): string | null {
    return this._cookieService.get('token') || null;
  }

  register(formData: object): Observable<any> {
    return this._HttpClient.post('http://localhost:3000/users/register', formData);
  }

  login(loginData: object): Observable<any> {
    return this._HttpClient.post('http://localhost:3000/users/signin', loginData);
  }
}
