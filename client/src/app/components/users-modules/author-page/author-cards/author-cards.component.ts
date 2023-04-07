import { Component } from '@angular/core';

@Component({
  selector: 'app-author-cards',
  templateUrl: './author-cards.component.html',
  styleUrls: ['./author-cards.component.css'],
})
export class AuthorCardsComponent {
  authors = [
    { name: 'John Doe', image: '../../../../../assets/books-imgs/the-curious.jpg' },
    { name: 'Jane Smith', image: 'jane-smith.png' },
    { name: 'Mark Johnson', image: 'mark-johnson.png' },
    { name: 'Emily Davis', image: 'emily-davis.png' },
    { name: 'Michael Lee', image: 'michael-lee.png' },
    { name: 'Sophia Hernandez', image: 'sophia-hernandez.png' },
    { name: 'Jacob Wilson', image: 'jacob-wilson.png' },
    { name: 'Isabella Taylor', image: 'isabella-taylor.png' },
    { name: 'William Garcia', image: 'william-garcia.png' },
    { name: 'Ava Martinez', image: 'ava-martinez.png' },
    { name: 'Ethan Rodriguez', image: 'ethan-rodriguez.png' },
    { name: 'Mia Brown', image: 'mia-brown.png' },
    { name: 'Alexander Davis', image: 'alexander-davis.png' },
    { name: 'Olivia Thomas', image: 'olivia-thomas.png' },
  ];

  pageSize = 8;
  pageSizeOptions = [4, 8, 12];
}
