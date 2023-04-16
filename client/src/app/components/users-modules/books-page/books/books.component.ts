import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
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
totalCount!:number
pageSize!:number
currentPageIndex:number=1
totalPages!:number

constructor(private _books:UserBooksService,private route:ActivatedRoute){}
  ngOnInit(): void {
    this.getAllBooks()
  }

getAllBooks(){
this._books.getAllBooks(1,10).subscribe((res:any)=>{
  this.books=res.data.docs;
  this.totalCount=res.data.totalDocs;
  this.totalPages=res.data.totalPages;
})
}

onPageChanged(event: PageEvent) {
  const newPageIndex = event.pageIndex;
  const newPageSize = event.pageSize;
  if (newPageIndex !== this.currentPageIndex || newPageSize !== this.pageSize) {
    this.currentPageIndex = newPageIndex;
    this.pageSize = newPageSize;
    this._books.getAllBooks(this.currentPageIndex, this.pageSize).subscribe((result) => {
      this.books=result.data.docs;
      this.totalCount = result.data.totalDocs;
    });
  }
}

onPreviousPage() {
  if (this.currentPageIndex > 1) {
    this.currentPageIndex--;
    this._books.getAllBooks(this.currentPageIndex, 10).subscribe((result) => {
      this.books = result.data.docs;
      this.totalCount = result.data.totalDocs;
    });
  }
}

onNextPage() {
  if (this.currentPageIndex < this.totalPages) {
    this.currentPageIndex++;
    this._books.getAllBooks(this.currentPageIndex, 10).subscribe((result) => {
      this.books = result.data.docs;
      this.totalCount = result.data.totalDocs;
    });
  }
}

}
