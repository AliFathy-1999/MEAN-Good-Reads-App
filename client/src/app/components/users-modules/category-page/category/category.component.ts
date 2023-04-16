import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/dataTypes/typesModule';
import { UserCategoryService } from 'src/app/services/user-category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit{

// books:Book[]=[]
books!:any;
currentPageIndex:number=1;
pageSize!:number;
data!:number;
totalCount!:number;
totalPages!: number;
booksData!:any
// categories:Category[]=[]

constructor(private _category:UserCategoryService,private route:ActivatedRoute){}
  ngOnInit(){
this.route.params.subscribe(params=>this.getBooks(params['id']))
  }

getBooks(id:number){
this._category.getCategoryBooks(id,1,4).subscribe((res:any)=>{
  this.books=res.data.docs
  this.totalPages=res.data.totalPages
  this.booksData=res.data;
})
}

onPageChanged(event:PageEvent) {
  const newPageIndex = event.pageIndex;
  const newPageSize = event.pageSize;
  if (newPageIndex !== this.currentPageIndex || newPageSize !== this.pageSize) {
    this.currentPageIndex = newPageIndex;
    this.pageSize = newPageSize;
    this._category.getCategoryBooks(this.route.snapshot.params['id'],this.currentPageIndex, this.pageSize).subscribe((result) => {
      this.books = result.data.docs;
      this.totalCount = result.totalCount;

    });
  }
}

onPreviousPage(){
  if (this.currentPageIndex > 1) {
    this.currentPageIndex--;
    this._category.getCategoryBooks(this.route.snapshot.params['id'],this.currentPageIndex, 4).subscribe((result) => {
      this.books = result.data.docs;
      this.totalCount = result.totalCount;

    });
  }
}

onNextPage(){
  if (this.currentPageIndex < this.totalPages) {
    this.currentPageIndex++;
    this._category.getCategoryBooks(this.route.snapshot.params['id'],this.currentPageIndex, 4).subscribe((result) => {
    this.books = result.data.docs;
    this.totalCount = result.totalCount;

  })
}


}


}
