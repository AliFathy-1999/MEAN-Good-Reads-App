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
  token: string | null = this.getToken();
  authArr: Array<Author> = [];

  private apiUrl = 'http://localhost:3000/authors';

  constructor(private authService: AuthService, private httpClient: HttpClient, private cookieService: CookieService) {
    this.authService.getAuthorsApi(1, 5).subscribe((data: any) => {
      this.authArr = data;
    });
  }

  ngOnInt() {}
  isLogged(): boolean {
    return this.cookieService.get('token') != null;
  }

  getToken(): string | null {
    return this.cookieService.get('token') || null;
  }

  getAuthorById(id: number): Author | undefined {
    return this.authArr.find((author) => author._id === id);
  }

  getAuthors(): any {
    return this.authArr;
  }

  editAuthor(id: number): void {
    this.authArr.forEach((author) => {
      author.isEdit = author._id === id;
      console.log(author._id, id);
    });
  }

  deleteAuthor(id: number): Observable<any> {
    const url = `http://localhost:3000/authors/${id}`;
    return this.httpClient.delete(url);
  }

  addAuthor(authorForm: any): void {
    const author: any = {
      firstName: authorForm.get('firstName'),
      lastName: authorForm.get('lastName'),
      DOB: authorForm.get('DOB'),
      bio: authorForm.get('bio'),
      authorImg: authorForm.get('authorImage'),
      isEdit: false,
    };
    this.authArr.push(author);
  }

  updateAuthor(id: number, formData: FormData): Observable<any> {
    const url = `http://localhost:3000/authors/${id}`;
    return this.httpClient.patch(url, formData);
  }
}
