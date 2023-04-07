import { Component } from '@angular/core';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css'],
})
export class BookDetailsComponent {
  book = {
    imageUrl: 'https://via.placeholder.com/300x400',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    category: 'Fiction',
    rating: 4.5,
    description: 'A story about the decadence of the Jazz Age.',
  };

  bookName: string = 'The Great Gatsby';
  authorName: string = 'F. Scott Fitzgerald';
  categoryName: string = 'Fiction';
  rating: number = 4.5;
  description: string = 'A story about the decadence of the Jazz Age.';
  readStatus: string = 'Want to Read';

  changeReadStatus(event: any) {
    this.readStatus = event.target.value;
  }
}
