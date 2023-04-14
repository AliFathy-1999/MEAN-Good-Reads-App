import { Component, OnInit } from '@angular/core';
import { UserBooksService } from 'src/app/services/user-books.service';

@Component({
  selector: 'app-all-books',
  templateUrl: './all-books.component.html',
  styleUrls: ['./all-books.component.css'],
})
export class AllBooksComponent{


  userProfileData = [
    {
      coverImage: '../../../../../assets/books-imgs/the-curious.jpg',
      photo: '../../../../../assets/author-imgs/ahmedKhaled.jpg',
      name: 'User Name',
      author: 'Book Author',
      rating: 4.5,
      averageRating: 4.2,
      shelf: 'reading',
    },
    // add more profile data objects here
  ];

  // Define the table columns
  tableColumns = ['coverImage', 'photo', 'name', 'author', 'rating', 'averageRating', 'shelf'];

}
