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
      console.log(this.authArr);
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
    // const url = `${this.apiUrl}/${id}`;
    console.log('Delete 2');

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

  updateAuthor(id: number, newAuthorForm: any): Observable<any> {
    const authorIndex = this.authArr.findIndex((author) => author._id === id);

    if (authorIndex !== -1) {
      const authorToUpdate = this.authArr[authorIndex];
      authorToUpdate.firstName = newAuthorForm.get('firstName');
      authorToUpdate.lastName = newAuthorForm.get('lastName');
      authorToUpdate.DOB = newAuthorForm.get('DOB');
      authorToUpdate.bio = newAuthorForm.get('bio');
      authorToUpdate.authorImg = newAuthorForm.get('authorImage');
      authorToUpdate.isEdit = false;

      console.log(authorToUpdate);

      const url = `${this.apiUrl}/${id}`;

      return this.httpClient.put(url, authorToUpdate);
    } else {
      return throwError(`Author with ID ${id} does not exist in the array.`);
    }
  }
}
