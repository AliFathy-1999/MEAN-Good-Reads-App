import { Component, NgModule, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/auth.service';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.css'],
})
export class UserNavbarComponent implements OnInit {
  user!: any;
  searchTerm: string = '';
  searchResults: any[] = [];
  constructor(
    private _cookieService: CookieService,
    private _router: Router,
    private _auth: AuthService,
    private _bookService: BooksService
  ) {}
  ngOnInit(): void {}

  logout() {
    this._router.navigate(['']);
    return this._cookieService.delete('token');
  }

  getUser() {
    this._auth.getUserData(1, 5).subscribe((res) => {
      this.user = res.user;
    });
  }

  search() {
    this._bookService.searchBooks(this.searchTerm).subscribe({
      next: (response: any) => {
        this.searchResults = response.data.docs;
        console.log(this.searchResults);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
