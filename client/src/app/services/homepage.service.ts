import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../envs/environment';

@Injectable({
  providedIn: 'root'
})
export class HomepageService {
  url: string = environment.ENV_URL;

  constructor(private http: HttpClient) { }

  getPopularBooks():Observable<any>{
    return this.http.get(`${this.url}/books/popular`);
  }
  getPopularAuthors():Observable<any>{
    return this.http.get(`${this.url}/authors/popular`);
  }
  getPopularCategories():Observable<any>{
    return this.http.get(`${this.url}/categories/popular`);
  }
}
