import { Component } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent {
  books = [
    {
      title: 'Book 1',
      author: 'Author 1',
      description: 'Description 1',
      imageUrl: '../../../../assets/books-imgs/the-curious.jpg',
    },
    {
      title: 'Book 2',
      author: 'Author 2',
      description: 'Description 2',
      imageUrl: '../../../../assets/books-imgs/the-curious.jpg',
    },
    {
      title: 'Book 3',
      author: 'Author 3',
      description: 'Description 3',
      imageUrl: '../../../../assets/books-imgs/the-curious.jpg',
    },
    {
      title: 'Book 4',
      author: 'Author 4',
      description: 'Description 4',
      imageUrl: '../../../../assets/books-imgs/the-curious.jpg',
    },
    {
      title: 'Book 5',
      author: 'Author 5',
      description: 'Description 5',
      imageUrl: '../../../../assets/books-imgs/the-curious.jpg',
    },
    {
      title: 'Book 6',
      author: 'Author 6',
      description: 'Description 6',
      imageUrl: '../../../../assets/books-imgs/the-curious.jpg',
    },
    {
      title: 'Book 7',
      author: 'Author 7',
      description: 'Description 7',
      imageUrl: '../../../../assets/books-imgs/the-curious.jpg',
    },
    {
      title: 'Book 8',
      author: 'Author 8',
      description: 'Description 8',
      imageUrl: '../../../../assets/books-imgs/the-curious.jpg',
    },
    {
      title: 'Book 9',
      author: 'Author 9',
      description: 'Description 9',
      imageUrl: '../../../../assets/books-imgs/the-curious.jpg',
    },
    {
      title: 'Book 10',
      author: 'Author 10',
      description: 'Description 10',
      imageUrl: '../../../../assets/books-imgs/the-curious.jpg',
    },
  ];

  pageSize = 8;
  pageSizeOptions = [4, 8, 12];
}
