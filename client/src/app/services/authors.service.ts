import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TypesModule, User, Author } from '../dataTypes/typesModule';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
// Service to manage authors data
export class AuthorsService {
  token: string | null = this.getToken();
  authArr: Array<Author> = [];

  constructor(
    private authService: AuthService,
    private _HttpClient: HttpClient,
    private _cookieService: CookieService
  ) {
    this.authService.getAuthorsApi(0, 10).subscribe((data: any) => {
      this.authArr = data;
      console.log(this.authArr);
    });
  }

  ngOnInit(): void {}

  isLogged(): boolean {
    return this._cookieService.get('token') != null;
  }

  getToken(): string | null {
    return this._cookieService.get('token') || null;
  }

  getAuthorById(id: number): Author | undefined {
    return this.authArr.find((author) => author._id === id);
  }

  getAuthors(): any {
    return this.authArr;
  }

  editAuthor(id: number) {
    this.authArr.forEach((author) => {
      author.isEdit = author._id === id;
      console.log(author._id, id);
    });
  }

  deleteAuthor(id: number) {
    const index = this.authArr.findIndex((author) => author._id === id);
    if (index >= 0) {
      this.authArr.splice(index, 1);
      this.authArr = [...this.authArr];
    }
    this.authService.removeAuthor(id).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  addAuthor(authorForm: any): void {
    let author: any = {
      firstName: authorForm.get('firstName'),
      lastName: authorForm.get('lastName'),
      DOB: authorForm.get('DOB'),
      bio: authorForm.get('bio'),
      authorImg: authorForm.get('authorImage'),
      isEdit: false,
      // this.authService.addAuthor(authorForm)
    };
    this.authArr.push(author);
  }

  updateAuthor(id: number, newAuthorForm: any): void {
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
    } else {
      alert(`Author with ID ${id} does not exist in the array.`);
    }
  }
}
