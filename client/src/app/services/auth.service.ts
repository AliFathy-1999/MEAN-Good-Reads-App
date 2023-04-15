import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from '../../../envs/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url: string = environment.ENV_URL;
  token: string | null = this.getToken();
  constructor(private _HttpClient: HttpClient, private _cookieService: CookieService) {}

  isLogged(): boolean {
    return this._cookieService.get('token') != null;
  }
  LogOut() {
    return this._cookieService.delete('token');
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
    const options = { withCredentials: true };
    return this._HttpClient.post(`${this.url}/signin`, loginData, { headers });
  }
}
