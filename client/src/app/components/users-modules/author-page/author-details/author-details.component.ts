import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { UserAuthorService } from 'src/app/services/user-author.service';

@Component({
  selector: 'app-author-details',
  templateUrl: './author-details.component.html',
  styleUrls: ['./author-details.component.css'],
})
export class AuthorDetailsComponent {
  author!:any
  stars: string[] = ['star', 'star', 'star', 'star_half', 'star_border'];
  totalDocs!:number
  totalPages!:number
  pageSize!:number
  selectedValue: string | undefined;
  currentPageIndex:number=1


  constructor(private _author:UserAuthorService,private route:ActivatedRoute) {}

  ngOnInit(){
    this.route.params.subscribe(params=>this.getAuthor(params['id']))
  }


getAuthor(id:number){
this._author.getAuthorsById(id,this.currentPageIndex,3).subscribe({next:res=>{
  console.log(res)
  this.author=res
  this.totalDocs=res.data.totaalDocs
  this.totalPages=res.data.totalPages
}})
}

onPageChanged(event:PageEvent){

  const newpageSize=event.pageSize
  const newPageIndex=event.pageIndex
  if( newPageIndex!== this.currentPageIndex || newpageSize !== this.pageSize){
    this.currentPageIndex=newPageIndex;
    this.pageSize=newpageSize;
    this._author.getAuthorsById(this.author._id,this.currentPageIndex,this.pageSize).subscribe({
      next:res=>{
        this.author=res
      }
    })
  }
}

onPerviousPage(){
  if (this.currentPageIndex > 1) {
    this.currentPageIndex--;
    this._author.getAuthorsById(this.author.author._id,this.currentPageIndex,3).subscribe((result) => {
      this.author = result;
      this.totalDocs = result.data.totaalDocs;
    })
}
}

onNextPage(){
  if(this.currentPageIndex<this.totalPages){
    this.currentPageIndex++;
    this._author.getAuthorsById(this.author.author._id,this.currentPageIndex,3).subscribe((result)=>{
      this.author=result;
      this.totalDocs = result.data.totaalDocs;
    })
  }
}
}
