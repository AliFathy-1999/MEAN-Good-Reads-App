import { ToastrService } from 'ngx-toastr';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { UserAuthorService } from 'src/app/services/user-author.service';
import { UserBooksService } from 'src/app/services/user-books.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-author-details',
  templateUrl: './author-details.component.html',
  styleUrls: ['./author-details.component.css'],
})
export class AuthorDetailsComponent {
  author!:any
  totalDocs!:number
  totalPages!:number
  pageSize!:number
  selectedValue: string | undefined;
  currentPageIndex:number=1
  currentRate:number = 5;
  books:any
  reviews:any
  starrating!:number;
  ratingForm = new FormGroup({
    rating: new FormControl(''),
  });
  statusForm = new FormGroup({
    shelf: new FormControl(''),
  });
  constructor(private toastr:ToastrService,private _author:UserAuthorService,private route:ActivatedRoute,private _userBooks:UserBooksService,private _books:UserBooksService,private _auth:AuthService) {}

  ngOnInit(){
    this.route.params.subscribe(params=>this.getAuthor(params['id']))
  }


getAuthor(id:number){
this._author.getAuthorsById(id,this.currentPageIndex,3).subscribe({next:res=>{
  console.log(res)
  this.author=res.data.docs
  this.totalDocs=res.data.totaalDocs
  this.totalPages=res.data.totalPages
}})
}

getBookById(id:number){
  this._books.getBookById(id).subscribe((res:any)=>{
    console.log(res.data)
    this.books=res.data.book
    this.reviews=res.data.reviews
    this._auth.saveCurrentUser();
    const user=this._auth.currentUser.getValue();
    console.log("hi")
    this.starrating=res.data.reviews.filter((elem :any) =>
      elem.user._id==user.userId)[0].rating
      console.log(id)
    console.log(this.starrating)
  })
  }


onPageChanged(event:PageEvent){

  const newpageSize=event.pageSize
  const newPageIndex=event.pageIndex
  if( newPageIndex!== this.currentPageIndex || newpageSize !== this.pageSize){
    this.currentPageIndex=newPageIndex;
    this.pageSize=newpageSize;
    this._author.getAuthorsById(this.author._id,this.currentPageIndex,this.pageSize).subscribe({
      next:res=>{
        this.author=res.data.docs
      }
    })
  }
}

onPerviousPage(){
  if (this.currentPageIndex > 1) {
    this.currentPageIndex--;
    this._author.getAuthorsById(this.author.author._id,this.currentPageIndex,3).subscribe((result) => {
      this.author=result.data.docs
      this.totalDocs = result.data.totaalDocs;
    })
}
}

onNextPage(){
  if(this.currentPageIndex<this.totalPages){
    this.currentPageIndex++;
    this._author.getAuthorsById(this.author.author._id,this.currentPageIndex,3).subscribe((result)=>{
      this.author=result.data.docs
      this.totalDocs = result.data.totaalDocs;
    })
  }
}

stars: { filled: boolean, hover: boolean }[] = Array(5).fill(null).map(() => ({ filled: false, hover: false }));
onStarHover(star: any) {
  star.hover = true;
}

onStarLeave(star: any) {
  star.hover = false;
}

updateRate(rating: number,bookId:number){
  const obj:object={
    "rating": rating
  }

  this._userBooks.bookReview(bookId,obj).subscribe((res) => {
    this.toastr.success("Rated successfully :)")
    this.getAuthor(this.route.snapshot.params['id'])
    this.getBookById(bookId);

      },(err)=>{
        this.toastr.error(err.message)
      })

  }


onStarClick(star: any,bookId:number) {
  const rating=this.stars.indexOf(star) + 1
  this.updateRate(rating,bookId)
}

Change(bookId:number,rating:number){
  this.updateRate(rating,bookId)
}


addToShelf(id:number,event:any){
  this._userBooks.bookReview(id,{shelf:event.value}).subscribe((res:any)=>{
    this.toastr.success(`Book status is changed to ${event.value}`)
  },(err)=>{
    this.toastr.error(err.message)
  })
}
}
