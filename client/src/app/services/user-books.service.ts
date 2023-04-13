import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Book } from '../dataTypes/typesModule';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserBooksService {

  constructor(private _http:HttpClient,private cookieService: CookieService) { }

  isLogged(): boolean {
    return this.cookieService.get('token') != null;
  }

  getAllBooks(page:number,limit:number): Observable<Book>{
   return this._http.get<Book>(`http://localhost:3000/books?page=${page}&limit=${limit}`);
  }

  getBookById(id:number): Observable<Book>{
    return this._http.get<Book>(`http://localhost:3000/books/${id}`);
   }
   
   bookReview(id:number,data:object):Observable<any>{
    return this._http.patch(`localhost:3000/user/books/${id}`,data)
   }
}
