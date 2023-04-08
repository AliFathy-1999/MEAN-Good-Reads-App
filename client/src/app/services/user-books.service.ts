import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Book } from '../dataTypes/typesModule';

@Injectable({
  providedIn: 'root'
})
export class UserBooksService {

  constructor(private _http:HttpClient) { }

  getAllBooks(page:number,limit:number): Observable<Book>{
   return this._http.get<Book>(`http://localhost:3000/books?page=${page}&limit=${limit}`);
  }

  getBookById(id:number): Observable<Book>{
    return this._http.get<Book>(`http://localhost:3000/books/${id}`);
   }
}
