import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HomepageService {

  constructor(private http: HttpClient) { }

  getPopularBooks():Observable<any>{
    return this.http.get('http://localhost:3000/books/popular');
  }
  getPopularAuthors():Observable<any>{
    return this.http.get('http://localhost:3000/authors/popular');
  }
  getPopularCategories():Observable<any>{
    return this.http.get('http://localhost:3000/categories/popular');
  }
}
