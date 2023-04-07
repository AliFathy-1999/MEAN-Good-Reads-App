import { Component } from '@angular/core';

@Component({
  selector: 'app-want-to-read',
  templateUrl: './want-to-read.component.html',
  styleUrls: ['./want-to-read.component.css'],
})
export class WantToReadComponent {
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
