import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { TypesModule, User, Author } from '../dataTypes/typesModule';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthorsService {
  authArr: Array<Author> = [];

  private apiUrl = 'http://localhost:3000/authors';

  constructor(private authService: AuthService, private httpClient: HttpClient, private cookieService: CookieService) {}

  ngOnInt() {}

  isLogged(): boolean {
    return this.cookieService.get('token') != null;
  }

  getAuthorById(id: number): Author | undefined {
    return this.authArr.find((author) => author._id === id);
  }

  deleteAuthor(id: number): Observable<any> {
    const url = `http://localhost:3000/authors/${id}`;
    return this.httpClient.delete(url);
  }

  addAuthor(authorForm: any): Observable<any> {
    const author: any = {
      firstName: authorForm.get('firstName'),
      lastName: authorForm.get('lastName'),
      DOB: authorForm.get('DOB'),
      bio: authorForm.get('bio'),
      authorImg: authorForm.get('authorImg'),
      isEdit: false,
    };
    this.authArr.push(author);
    console.log(authorForm.get('authorImg'));

    return this.httpClient.post('http://localhost:3000/authors', authorForm);
  }

  getAuthorsApi(page: number, limit: number): Observable<any> {
    const url = `http://localhost:3000/authors/${page}/${limit}`;
    return this.httpClient.get(url);
  }

  updateAuthor(id: number, formData: FormData): Observable<any> {
    const url = `http://localhost:3000/authors/${id}`;
    return this.httpClient.patch(url, formData);
  }
}
