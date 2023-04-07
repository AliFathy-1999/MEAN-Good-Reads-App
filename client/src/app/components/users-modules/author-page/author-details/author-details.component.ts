import { Component } from '@angular/core';

@Component({
  selector: 'app-author-details',
  templateUrl: './author-details.component.html',
  styleUrls: ['./author-details.component.css'],
})
export class AuthorDetailsComponent {
  author = {
    imageUrl: '../../../../../assets/author-imgs/ahmedKhaled.jpg',
    name: 'Hossam Fahmy',
    dob: '01/04/1998',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  };

  book = {
    imageUrl: '../../../../../assets/books-imgs/the-curious.jpg',
  };
  stars: string[] = ['star', 'star', 'star', 'star_half', 'star_border'];

  selectedValue: string | undefined;

  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 50];

  constructor() {}

  ngOnInit(): void {}
}
