import { Component, OnInit } from '@angular/core';
import { UserBooksService } from 'src/app/services/user-books.service';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css'],
})
export class UserTableComponent implements OnInit{
  
  constructor(private _user:UserBooksService){}

  ngOnInit(){
this.getUser()
  }

  getUser(){
    this._user.getUserBooks().subscribe((res)=>{
      console.log(res)
    })
  }
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
