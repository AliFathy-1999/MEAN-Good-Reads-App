import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { UserBooksService } from 'src/app/services/user-books.service';
enum Shelf {
  READ = 'read',
  READING = 'reading',
  WANT2READ = 'want2read',
}
@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css'],
})
export class ReadComponent {
  totalDocs!:number
  totalPages!:number
  pageSize!:number
  currentPageIndex:number=1
  userProfileData:any = [{}]
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource :any= [] ;
  data: any;
  totalCount!:number
  page: number = 1;
  count: number = 0;
  collectionSize: number = 100;
  shelf:string | null= null
  ratingForm = new FormGroup({
    rating: new FormControl(''),
  });
  currentRate:number = 0;
  constructor(private _user:UserBooksService,private _userBooks:UserBooksService,private toastr:ToastrService){}
  ngOnInit(){
    this.getUser()
  }

  getUser(){
    this._user.getUserBooksByShelf(1,5,Shelf.READ).subscribe((res)=>{
      console.log(res);
      this.userProfileData=res.data.docs;
      this.dataSource = res.data.docs
      this.currentRate = this.dataSource.rating

      console.log(this.dataSource);
      this.totalCount = res.totaalDocs;
      this.totalPages = res.totalPages;
      this.totalDocs=res.totalDocs
      this.totalPages=res.totalPages
      console.log("this.userProfileData.book._id",this.userProfileData);

    })
  }

  // Define the table columns
  tableColumns = ['coverImage', 'photo', 'name', 'author', 'rating', 'averageRating', 'shelf'];
  onPageChanged(event: PageEvent) {
    const newPageIndex = event.pageIndex;
    const newPageSize = event.pageSize;
    if (newPageIndex !== this.currentPageIndex || newPageSize !== this.pageSize) {
      this.currentPageIndex = newPageIndex;
      this.pageSize = newPageSize;
      this._user.getUserBooks(this.currentPageIndex, this.pageSize).subscribe((result) => {
        this.dataSource = result.docs;
        this.totalCount = result.totalDocs;
      });
    }
  }

  onPreviousPage() {
    if (this.currentPageIndex > 1) {
      this.currentPageIndex--;
      this._user.getUserBooks(this.currentPageIndex, 4).subscribe((result) => {
        this.dataSource = result.data.docs;
        this.totalCount = result.totaalDocs;
      });
    }
  }

  onNextPage() {
    console.log(this.currentPageIndex);
    if (this.currentPageIndex < this.totalPages) {
      console.log(this.currentPageIndex);
      this.currentPageIndex++;
      this._user.getUserBooks(this.currentPageIndex, 4).subscribe((result) => {
        this.dataSource = result.data.docs;
        this.totalCount = result.totalDocs;
      });
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
      this.getUser()
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
