import { Component } from '@angular/core';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css'],
})
export class BookDetailsComponent {
  book = {
    imageUrl: '../../../../../assets/books-imgs/the-curious.jpg',
    title: 'The Book Title',
    author: 'Author Name',
    category: 'Fiction',
    rating: 4.5,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  };

  stars: string[] = ['star', 'star', 'star', 'star_half', 'star_border'];

  selectedValue: string | undefined;

  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 50];

  constructor() {}

  ngOnInit(): void {}
}
