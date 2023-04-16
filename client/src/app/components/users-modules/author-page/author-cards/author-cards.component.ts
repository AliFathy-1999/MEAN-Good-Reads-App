import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { UserAuthorService } from 'src/app/services/user-author.service';

@Component({
  selector: 'app-author-cards',
  templateUrl: './author-cards.component.html',
  styleUrls: ['./author-cards.component.css'],
})
export class AuthorCardsComponent implements OnInit{

  totalDocs!:number
  totalPages!:number
  pageSize!:number
  currentPageIndex:number=1
  authors:any


constructor(private _author:UserAuthorService){}

  ngOnInit(): void {
 this.getAuthors()
  }


getAuthors(){
  this._author.getAuthors(this.currentPageIndex,5).subscribe({next:(res)=>{
    this.authors=res.data.docs;
    this.totalDocs=res.data.totalDocs
    this.totalPages=res.data.totalPages

  }})
}


onPageChanged(event:PageEvent){
  const newpageSize=event.pageSize
  const newPageIndex=event.pageIndex
  if( newPageIndex!== this.currentPageIndex || newpageSize !== this.pageSize){
    this.currentPageIndex=newPageIndex;
    this.pageSize=newpageSize;
    this._author.getAuthors(this.currentPageIndex,this.pageSize).subscribe({
      next:res=>{
        this.authors=res.data.docs;
      }
    })
  }
}

onPerviousPage(){
  if (this.currentPageIndex > 1) {
    this.currentPageIndex--;
    this._author.getAuthors(this.currentPageIndex,5).subscribe((result) => {
      this.authors=result.data.docs;
      this.totalDocs = result.data.totalDocs;
    })
}
}

onNextPage(){
  if(this.currentPageIndex<this.totalPages){
    this.currentPageIndex++;
    this._author.getAuthors(this.currentPageIndex,5).subscribe((result)=>{
      this.authors=result.docs;
      this.totalDocs = result.totalDocs;
    })
  }
}

}
