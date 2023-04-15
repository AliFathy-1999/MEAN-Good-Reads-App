import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book, Category } from 'src/app/dataTypes/typesModule';
import { HomepageService } from 'src/app/services/homepage.service';
import { UserAuthorService } from 'src/app/services/user-author.service';
import { UserBooksService } from 'src/app/services/user-books.service';
import { UserCategoryService } from 'src/app/services/user-category.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent {
  authors: any;
  categories:any = [];
  books: Book[] = [];
  constructor(
    private _author: UserAuthorService,
    private _category: UserCategoryService,
    private _books: UserBooksService,
    private _home: HomepageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getPopularAuthors();
    this.getPopularCategories();
    this.getPopularBooks();
  }

  getPopularAuthors() {
    this._home.getPopularAuthors().subscribe({
      next: (res) => {
        this.authors = res.data;
      },
    });
  }
  getPopularCategories() {
    this._home.getPopularCategories().subscribe((res) => {
      this.categories = res.data;
    });
  }
  getPopularBooks() {
    this._home.getPopularBooks().subscribe((res: any) => {
      this.books = res.data;
    });
  }
}
