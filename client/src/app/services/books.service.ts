import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  constructor(private _HttpClient: HttpClient, private cookieService: CookieService) {
    
  }

  isLogged(): boolean {
    return this.cookieService.get('token') != null;
  }

  addBook(bookData: object): Observable<any> {
    console.log(bookData);
    const headers = { 'Content-Type': 'application/json' };
    const options = { withCredentials: true};
    return this._HttpClient.post('http://localhost:3000/admin/books', bookData,options);
    // return this._HttpClient.post('https://bookary.onrender.com/admin/books', bookData);
  }
  getAllBooks(page: number, limit: number): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    const options = { withCredentials: true};
    // return this._HttpClient.get(`https://bookary.onrender.com/admin/books?page=${page}&limit=${limit}`);
    return this._HttpClient.get(`http://localhost:3000/admin/books?page=${page}&limit=${limit}`,options);

  }

  deleteBookById(id: number): Observable<any> {
    const options = { withCredentials: true };
    // return this._HttpClient.delete(`https://bookary.onrender.com/admin/books/${id}`);
    return this._HttpClient.delete(`http://localhost:3000/admin/books/${id}`,options);

  }

  editBook(id: number, data: object) {
    const headers = { 'Content-Type': 'application/json' };
    const options = { withCredentials: true};
    return this._HttpClient.patch(`http://localhost:3000/admin/books/${id}`, data,options);
    // return this._HttpClient.patch(`https://bookary.onrender.com/admin/books/${id}`, data);
  }
}
