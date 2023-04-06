import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private _http:HttpClient) { }

addCategory(categoryData:object):Observable<any>{
  return this._http.post('http://localhost:3000/category', categoryData);
}

getCategory():Observable<any>{
  return this._http.get('http://localhost:3000/category')
}

getCategoryById(id:number):Observable<any>{
  return this._http.get(`http://localhost:3000/category${id}`)
}

updateCategory(id:number,data:object):Observable<any>{
  return this._http.patch(`http://localhost:3000/category/${id}`,data)
}

deleteCategoryById(id:number):Observable<any>{
  return this._http.delete(`http://localhost:3000/category/${id}`)
}

}
