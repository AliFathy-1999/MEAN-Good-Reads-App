import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../envs/environment';

@Injectable({
  providedIn: 'root',
})
export class UserAuthorService {
  url: string = environment.ENV_URL;

  constructor(private _http: HttpClient) {}
  getAuthors(page: number, limit: number): Observable<any> {
    return this._http.get(`${this.url}/authors?page=${page}&limit=${limit}`);
  }

  getAuthorsById(id: number, page: number, limit: number): Observable<any> {
    return this._http.get(`${this.url}/authors/${id}?page=${page}&limit=${limit}`);
  }

  getPopularAuthors(): Observable<any> {
    return this._http.get(`${this.url}/authors/popular`);
  }
}
