import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAuthorService {

  constructor(private _http:HttpClient) { }
  // http://localhost:3000/users?page=0&limit=5
  getAuthors(page: number, limit: number): Observable<any> {
    return this._http.get(`http://localhost:3000/users/authors?page=${page}&limit=${limit}`);
  }

  getAuthorsById(id:number,page:number,limit:number):Observable<any>{
   return this._http.get(`http://localhost:3000/authors/${id}?page=${page}&limit=${limit}`)
  }

}
