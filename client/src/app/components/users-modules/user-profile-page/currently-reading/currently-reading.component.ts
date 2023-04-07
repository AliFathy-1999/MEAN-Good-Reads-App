import { Component } from '@angular/core';

@Component({
  selector: 'app-currently-reading',
  templateUrl: './currently-reading.component.html',
  styleUrls: ['./currently-reading.component.css'],
})
export class CurrentlyReadingComponent {
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
