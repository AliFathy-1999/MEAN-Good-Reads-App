import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  constructor(private _HttpClient: HttpClient) {}

<<<<<<< HEAD
  constructor(private _HttpClient:HttpClient,private cookieService: CookieService) { }

  isLogged(): boolean {
    return this.cookieService.get('token') != null;
  }

  addBook(bookData:object):Observable<any>{
    return this._HttpClient.post('http://localhost:3000/admin/books',bookData)
=======
  addBook(bookData: object): Observable<any> {
    console.log(bookData);

    return this._HttpClient.post('http://localhost:3000/books', bookData);
>>>>>>> 343461865e3c46e4b86f6092a8547ca5b452bac5
  }
  getAllBooks(): Observable<any> {
    return this._HttpClient.get('http://localhost:3000/books');
  }

  deleteBookById(id: number): Observable<any> {
    return this._HttpClient.delete(`http://localhost:3000/books/${id}`);
  }

<<<<<<< HEAD
  editBook(id:number,data:object){
   return this._HttpClient.patch(`http://localhost:3000/books/${id}`,data)
=======
  editBook(id: number, data: object) {
    return this._HttpClient.put(`http://localhost:3000/books/${id}`, data);
>>>>>>> 343461865e3c46e4b86f6092a8547ca5b452bac5
  }
}
