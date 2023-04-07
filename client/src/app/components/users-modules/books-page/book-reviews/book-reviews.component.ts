import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-book-reviews',
  templateUrl: './book-reviews.component.html',
  styleUrls: ['./book-reviews.component.css'],
})
export class BookReviewsComponent implements OnInit {
  stars: string[] = ['star', 'star', 'star', 'star', 'star']; // Define the stars property with an array of 5 stars

  constructor() {}

  ngOnInit(): void {}
}
