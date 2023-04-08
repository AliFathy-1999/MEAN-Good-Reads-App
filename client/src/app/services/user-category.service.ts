import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class UserCategoryService {

  constructor(private _http:HttpClient) { }

  getAllCategories():Observable<any>{
    return this._http.get('http://localhost:3000/categories');
  }

  getCategoryBooks(id:number,page:number,limit:number):Observable<any>{
    return this._http.get(`http://localhost:3000/categories/${id}/?page=${page}&limit=${limit}`)
  }

}
