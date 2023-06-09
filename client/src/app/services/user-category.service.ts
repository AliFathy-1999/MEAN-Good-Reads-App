import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../../envs/environment';

@Injectable({
  providedIn: 'root',
})
export class UserCategoryService {
  url: string = environment.ENV_URL;

  constructor(private _http: HttpClient) {}

  getAllCategories(): Observable<any> {
    // return this._http.get('https://bookary.onrender.com/categories');
    const options = { withCredentials: true };

    return this._http.get(`${this.url}/categories`,options);

  }

  getCategoryBooks(id: number, page: number, limit: number): Observable<any> {
    const options = { withCredentials: true };

    return this._http.get(`${this.url}/categories/${id}/?page=${page}&limit=${limit}`,options);
  }
}
