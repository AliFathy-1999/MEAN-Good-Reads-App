import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../envs/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  url: string = environment.ENV_URL;

  constructor(private _http: HttpClient) {}

  addCategory(categoryData: object): Observable<any> {
    const options = { withCredentials: true };
    return this._http.post('http://localhost:3000/admin/categories', categoryData,options);

    // return this._http.post('https://bookary.onrender.com/admin/categories', categoryData);
  }

  getCategory(page: number, limit: number): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    const options = { withCredentials: true };
    return this._http.get(`http://localhost:3000/admin/categories?page=${page}&limit=${limit}`,options);
  }

  getCategoryById(id: number): Observable<any> {
    return this._http.get(`${this.url}/category${id}`);
  }

  updateCategory(id: number, data: object): Observable<any> {
    const options = { withCredentials: true };
    return this._http.patch(`http://localhost:3000/admin/categories/${id}`,data,options);
    // return this._http.post('https://bookary.onrender.com/admin/categories', categoryData);
  }

  deleteCategoryById(id: number): Observable<any> {
    const options = { withCredentials: true };
    return this._http.delete(`http://localhost:3000/admin/categories/${id}`,options);

    // return this._http.delete(`https://bookary.onrender.com/admin/categories/${id}`);
  }
}
