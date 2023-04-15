import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserAuthorService {
  constructor(private _http: HttpClient) {}
  getAuthors(page: number, limit: number): Observable<any> {
    return this._http.get(`https://bookary.onrender.com/authors?page=${page}&limit=${limit}`);
  }

  getAuthorsById(id: number, page: number, limit: number): Observable<any> {
    return this._http.get(`https://bookary.onrender.com/authors/${id}?page=${page}&limit=${limit}`);
  }

  getPopularAuthors(): Observable<any> {
    return this._http.get('https://bookary.onrender.com/authors/popular');
  }
}
