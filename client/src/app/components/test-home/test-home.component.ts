import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book, Category } from 'src/app/dataTypes/typesModule';
import { UserAuthorService } from 'src/app/services/user-author.service';
import { UserBooksService } from 'src/app/services/user-books.service';
import { UserCategoryService } from 'src/app/services/user-category.service';

@Component({
  selector: 'app-test-home',
  templateUrl: './test-home.component.html',
  styleUrls: ['./test-home.component.css'],
})
export class TestHomeComponent {
  totalDocs!: number;
  totalPages!: number;
  pageSize!: number;
  currentPageIndex: number = 1;
  authors: any;
  categories: Category[] = [];
  books: Book[] = [];
  totalCount!: number;

  constructor(
    private _author: UserAuthorService,
    private _category: UserCategoryService,
    private _books: UserBooksService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getAuthors();
    this.gitCategories();
    this.getAllBooks();
  }

  getAuthors() {
    this._author.getAuthors(1, 5).subscribe({
      next: (res) => {
        console.log(res);
        this.authors = res.docs;
        this.totalDocs = res.totalDocs;
        this.totalPages = res.totalPages;
        console.log(this.authors[0].authorImg);
      },
    });
  }
  gitCategories() {
    this._category.getAllCategories().subscribe((res) => {
      this.categories = res.data;
      console.log(res);
    });
  }
  getAllBooks() {
    this._books.getAllBooks(1, 10).subscribe((res: any) => {
      this.books = res.data.docs;
      this.totalCount = res.data.totalDocs;
      this.totalPages = res.data.totalPages;
      console.log(this.books);
    });
  }
}
