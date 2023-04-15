import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Book } from '../dataTypes/typesModule';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../envs/environment';

enum Shelf {
  READ = 'read',
  READING = 'reading',
  WANT2READ = 'want2read',
}
@Injectable({
  providedIn: 'root',
})
export class UserBooksService {
  url: string = environment.ENV_URL;

  constructor(private _http: HttpClient, private cookieService: CookieService) {}

  isLogged(): boolean {
    return this.cookieService.get('token') != null;
  }

  getAllBooks(page: number, limit: number): Observable<Book> {
    return this._http.get<Book>(`${this.url}/books?page=${page}&limit=${limit}`);
  }

  getBookById(id: number): Observable<Book> {
    return this._http.get<Book>(`${this.url}/books/${id}`);
  }

  bookReview(id: number, data: any): Observable<any> {
    return this._http.patch(`${this.url}/user/books/${id}`, data);
  }
  getUserBooks(page: number, limit: number): Observable<any> {
    return this._http.get(`${this.url}/user/books?page=${page}&limit=${limit}`);
  }
  getUserBooksByShelf(page: number, limit: number, shelf: Shelf): Observable<any> {
    return this._http.get(`${this.url}/user/books?page=${page}&limit=${limit}&shelf=${shelf}`);
  }
  getPopular(): Observable<any> {
    return this._http.get(`${this.url}/books/popular`);
  }
}
