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
  LogOut() {
    return this._cookieService.delete('token');
  }

  getUserData(page: number, limit: number): Observable<any> {
    return this._HttpClient.get(`https://bookary.onrender.com/users?page=${page}&limit=${limit}`);
  }

  getToken(): string | null {
    return this._cookieService.get('token') || null;
  }

  register(formData: object): Observable<any> {
    return this._HttpClient.post('https://bookary.onrender.com/register', formData);
  }

  login(loginData: object): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    const options = { withCredentials: true };
    return this._HttpClient.post('https://bookary.onrender.com/signin', loginData, { headers });
  }
}
