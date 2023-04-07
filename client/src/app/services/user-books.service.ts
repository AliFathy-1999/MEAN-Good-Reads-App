import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Book } from '../dataTypes/typesModule';

@Injectable({
  providedIn: 'root'
})
export class UserBooksService {

  constructor(private _http:HttpClient) { }

  getAllBooks(): Observable<Book>{
   return this._http.get<Book>('http://localhost:3000/book');
  }

  getBookById(id:number): Observable<Book>{
    return this._http.get<Book>(`http://localhost:3000/book/${id}`);
   }
}
