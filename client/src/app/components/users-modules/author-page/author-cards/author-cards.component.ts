import { Component } from '@angular/core';

@Component({
  selector: 'app-author-cards',
  templateUrl: './author-cards.component.html',
  styleUrls: ['./author-cards.component.css'],
})
export class AuthorCardsComponent {
  authors = [
    {
      name: 'Ahmed Khaled Tawfik 1',
      imageUrl: '../../../../../assets/author-imgs/ahmedKhaled.jpg',
    },
    {
      name: 'Ahmed Khaled Tawfik 2',
      imageUrl: '../../../../../assets/author-imgs/ahmedKhaled.jpg',
    },
    {
      name: 'Ahmed Khaled Tawfik 3',
      imageUrl: '../../../../../assets/author-imgs/ahmedKhaled.jpg',
    },
    {
      name: 'Ahmed Khaled Tawfik 4',
      author: 'Author 4',
      description: 'Description 4',
      imageUrl: '../../../../../assets/author-imgs/ahmedKhaled.jpg',
    },
    {
      name: 'Ahmed Khaled Tawfik 5',
      author: 'Author 5',
      description: 'Description 5',
      imageUrl: '../../../../../assets/author-imgs/ahmedKhaled.jpg',
    },
    {
      name: 'Ahmed Khaled Tawfik 6',
      author: 'Author 6',
      description: 'Description 6',
      imageUrl: '../../../../../assets/author-imgs/ahmedKhaled.jpg',
    },
    {
      name: 'Ahmed Khaled Tawfik 7',
      author: 'Author 7',
      description: 'Description 7',
      imageUrl: '../../../../../assets/author-imgs/ahmedKhaled.jpg',
    },
    {
      name: 'Ahmed Khaled Tawfik 8',
      author: 'Author 8',
      description: 'Description 8',
      imageUrl: '../../../../../assets/author-imgs/ahmedKhaled.jpg',
    },
    {
      name: 'Ahmed Khaled Tawfik 9',
      author: 'Author 9',
      description: 'Description 9',
      imageUrl: '../../../../../assets/author-imgs/ahmedKhaled.jpg',
    },
    {
      name: 'Ahmed Khaled Tawfik 10',
      author: 'Author 10',
      description: 'Description 10',
      imageUrl: '../../../../../assets/author-imgs/ahmedKhaled.jpg',
    },
  ];

  pageSize = 8;
  pageSizeOptions = [4, 8, 12];
}
