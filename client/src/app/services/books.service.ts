import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private _HttpClient:HttpClient) { }


  addBook(bookData:object):Observable<any>{
    return this._HttpClient.post('http://localhost:3000/books',bookData)
  }
  getAllBooks():Observable<any>{
    return this._HttpClient.get('http://localhost:3000/books')
  }

  deleteBookById(id:number):Observable<any>{
    return this._HttpClient.delete(`http://localhost:3000/books/${id}`)
  }

  editBook(id:number,data:object){
   return this._HttpClient.put(`http://localhost:3000/books/${id}`,data)
  }
}
