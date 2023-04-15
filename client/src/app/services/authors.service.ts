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

  private apiUrl = 'https://bookary.onrender.com/authors';

  constructor(private authService: AuthService, private httpClient: HttpClient, private cookieService: CookieService) {}

  ngOnInt() {}

  isLogged(): boolean {
    return this.cookieService.get('token') != null;
  }

  getAuthorById(id: number): Author | undefined {
    return this.authArr.find((author) => author._id === id);
  }

  deleteAuthor(id: number): Observable<any> {
    // const url = `https://bookary.onrender.com/admin/authors/${id}`;
    const url = `http://localhost:3000/admin/authors/${id}`;
    const options = { withCredentials: true };

    return this.httpClient.delete(url,options);
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
    const options = { withCredentials: true };

    // return this.httpClient.post('https://bookary.onrender.com/admin/authors', authorForm);
    return this.httpClient.post('http://localhost:3000/admin/authors', authorForm,options);

  }

  getAuthorsApi(page: number, limit: number): Observable<any> {
    // const url = `https://bookary.onrender.com/admin/authors?page=${page}&limit=${limit}`;
    const url = `http://localhost:3000/admin/authors?page=${page}&limit=${limit}`;
    const options = { withCredentials: true };

    return this.httpClient.get(url,options);
  }

  updateAuthor(id: number, formData: FormData): Observable<any> {
    const url = `http://localhost:3000/admin/authors/${id}`;
    // const url = `https://bookary.onrender.com/admin/authors/${id}`;
    const options = { withCredentials: true };

    return this.httpClient.patch(url, formData,options);
  }
}
