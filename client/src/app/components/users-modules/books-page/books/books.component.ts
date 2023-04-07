import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/dataTypes/typesModule';
import { UserBooksService } from 'src/app/services/user-books.service';
@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit {

books:Book[]=[]

constructor(private _books:UserBooksService){}
  ngOnInit(): void {
    this.getAllBooks();
  }

getAllBooks(){
this._books.getAllBooks().subscribe((res:any)=>{
  this.books=res
})
}

  page = 1;
  pageSize = 8;
  pageSizeOptions = [4, 8, 12];
}
