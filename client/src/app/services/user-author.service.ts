import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAuthorService {

  constructor(private _http:HttpClient) { }

  getAuthorsById(id:number):Observable<any>{
   return this._http.get(`http://localhost:3000/authors/${id}`)
  }
}
