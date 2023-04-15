import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../../envs/environment';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  url: string = environment.ENV_URL;

  constructor(private _HttpClient: HttpClient, private cookieService: CookieService) {}

  isLogged(): boolean {
    return this.cookieService.get('token') != null;
  }

  addBook(bookData: object): Observable<any> {
    console.log(bookData);
    return this._HttpClient.post(`${this.url}/admin/books`, bookData);
  }
  getAllBooks(page: number, limit: number): Observable<any> {
    return this._HttpClient.get(`${this.url}/admin/books?page=${page}&limit=${limit}`);
  }

  deleteBookById(id: number): Observable<any> {
    return this._HttpClient.delete(`${this.url}/admin/books/${id}`);
  }

  editBook(id: number, data: object) {
    return this._HttpClient.patch(`${this.url}/admin/books/${id}`, data);
  }
}
