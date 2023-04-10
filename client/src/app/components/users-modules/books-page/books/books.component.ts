import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/dataTypes/typesModule';
import { UserBooksService } from 'src/app/services/user-books.service';
@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit {

books:Book[]=[]

constructor(private _books:UserBooksService,private route:ActivatedRoute){}
  ngOnInit(): void {
    this.getAllBooks()
  }

getAllBooks(){
this._books.getAllBooks(1,10).subscribe((res:any)=>{
  this.books=res.data.docs
  console.log(this.books)
})
}

  // page = 1;
  pageSize = 8;
  pageSizeOptions = [4, 8, 12];
}
