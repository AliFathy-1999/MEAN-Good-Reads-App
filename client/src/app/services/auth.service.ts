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

  getToken(): string | null {
    return this._cookieService.get('token') || null;
  }

  register(formData: object): Observable<any> {
    return this._HttpClient.post('http://localhost:3000/users/register', formData);
  }

  login(loginData: object): Observable<any> {
    return this._HttpClient.post('http://localhost:3000/users/signin', loginData);
  }
  getAuthorsApi(page: number, limit: number): Observable<any> {
    const url = `http://localhost:3000/authors/${page}/${limit}`;
    return this._HttpClient.get(url);
  }

  addAuthor(author: FormData): Observable<any> {
    console.log(author.get('authorImg'));
    console.log(author.get('bio'));
    console.log(author.get('DOB '));

    return this._HttpClient.post('http://localhost:3000/authors', author);
  }
}
