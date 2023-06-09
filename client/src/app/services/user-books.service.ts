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
    const options = { withCredentials: true };

    return this._http.get<Book>(`${this.url}/books?page=${page}&limit=${limit}`,options);
  }

  getBookById(id:number): Observable<Book>{
    const options = { withCredentials: true };

    return this._http.get<Book>(`${this.url}/books/${id}`,options);
   }

   bookReview(id:number,data:any):Observable<any>{
    const options = { withCredentials: true };
    return this._http.patch(`${this.url}/user/books/${id}`,data,options)
   }
getUserBooks(page:number,limit:number):Observable<any>{
  const options = { withCredentials: true};
  return this._http.get(`${this.url}/user/books?page=${page}&limit=${limit}`,options)
}
getUserBooksByShelf(page:number,limit:number, shelf:Shelf):Observable<any>{
  const options = { withCredentials: true };

  return this._http.get(`${this.url}/user/books?page=${page}&limit=${limit}&shelf=${shelf}`,options)
}
getPopular():Observable<any>{
  const options = { withCredentials: true };
  return this._http.get(`${this.url}/books/popular`,options)
}

}
