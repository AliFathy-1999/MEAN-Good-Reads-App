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
    return this._http.post(`${this.url}/admin/categories`, categoryData);
  }

  getCategory(page: number, limit: number): Observable<any> {
    return this._http.get(`${this.url}/admin/categories?page=${page}&limit=${limit}`);
  }

  getCategoryById(id: number): Observable<any> {
    return this._http.get(`${this.url}/category${id}`);
  }

  updateCategory(id: number, data: object): Observable<any> {
    return this._http.patch(`${this.url}/admin/categories/${id}`, data);
  }

  deleteCategoryById(id: number): Observable<any> {
    return this._http.delete(`${this.url}/admin/categories/${id}`);
  }
}
