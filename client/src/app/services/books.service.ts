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
    const options = { withCredentials: true};
    return this._HttpClient.post(`${this.url}/admin/books`, bookData,options);
    // return this._HttpClient.post('https://bookary.onrender.com/admin/books', bookData);
  }
  getAllBooks(page: number, limit: number): Observable<any> {
    const options = { withCredentials: true};
    // return this._HttpClient.get(`https://bookary.onrender.com/admin/books?page=${page}&limit=${limit}`);
    return this._HttpClient.get(`${this.url}/admin/books?page=${page}&limit=${limit}`,options);

  }

  deleteBookById(id: number): Observable<any> {
    const options = { withCredentials: true };
    // return this._HttpClient.delete(`https://bookary.onrender.com/admin/books/${id}`);
    return this._HttpClient.delete(`${this.url}/admin/books/${id}`,options);

  }

  editBook(id: number, data: object) {
    const options = { withCredentials: true};
    return this._HttpClient.patch(`${this.url}/admin/books/${id}`, data,options);
    // return this._HttpClient.patch(`https://bookary.onrender.com/admin/books/${id}`, data);
  }
}
