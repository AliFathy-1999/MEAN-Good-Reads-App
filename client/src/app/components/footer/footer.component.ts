import { Component, OnInit } from '@angular/core';
import { HomePageComponent } from '../home-page/home-page.component';
import { Book, Category } from 'src/app/dataTypes/typesModule';
import { HomepageService } from 'src/app/services/homepage.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit{

  authors: any;
  categories:any = [];
  books: Book[] = [];

constructor(private _home:HomepageService){}
ngOnInit(): void {
  this.getPopularAuthors();
  this.getPopularCategories();
  // this.getPopularBooks();
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
// getPopularBooks() {
//   this._home.getPopularBooks().subscribe((res: any) => {
//     this.books = res.data;
//   });
// }
}
