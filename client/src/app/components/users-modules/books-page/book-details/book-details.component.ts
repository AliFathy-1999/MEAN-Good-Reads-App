import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/dataTypes/typesModule';
import { UserBooksService } from 'src/app/services/user-books.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css'],
})
export class BookDetailsComponent implements OnInit {
  selectedValue: string | undefined;
  errorMessage!:string;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 50];
  userReview!:FormGroup
  book: any |undefined
  reviews!:any
  // rating!:any
  userObj={
    review:''}
    obj:object={
      rating:0
    }
  starrating!:number
  userProfileData: any;
  constructor(private _book:UserBooksService, private route:ActivatedRoute,private router:Router,private _route:ActivatedRoute,private toastr: ToastrService,private _user:UserBooksService,private _auth:AuthService 
    ) {
    this.userReview=new FormGroup({
      review:new FormControl('',[Validators.maxLength(140),Validators.minLength(3)]),
    })
  }

  ngOnInit(){
this.route.params.subscribe(params=>this.getBookById(params['id']))
// this.getUser();
  }
  
  getBookById(id:number){
    this._book.getBookById(id).subscribe((res:any)=>{
      console.log(res.data)
      this.book=res.data.book
      this.reviews=res.data.reviews
      this._auth.saveCurrentUser();
      const user=this._auth.currentUser.getValue();
      this.starrating=res.data.reviews.filter((elem :any) =>elem.user._id==user.userId)[0].rating
    })
    }

  // onRateChange(event:number) {
  //   this.rating = event;
  // }
  // getUser(){
  //   this._user.getUserBooks(1,5).subscribe((res)=>{
  //     console.log(res);
  //     this.userProfileData=res.data.docs.rating;
      
  //     console.log(this.userProfileData)
  //   })
  // }

  stars: { filled: boolean, hover: boolean }[] = Array(5).fill(null).map(() => ({ filled: false, hover: false }));

  onStarHover(star: any) {
    star.hover = true;
  }

  onStarLeave(star: any) {
    star.hover = false;
  }

  updateRate(rating: number,bookId:number){
     const obj={
      "rating": rating
    }

    this._book.bookReview(bookId,obj).subscribe((res) => {
      this.toastr.success("Rated successfully :)")

      this.getBookById(this._route.snapshot.params['id'])
        },(err:any)=>{
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



onSubmit(){
    this.userObj.review=this.userReview.get('review')?.value;
    // this.userObj.rating=this.rating;
    const bookId = this.route.snapshot.params['id'];

    this._book.bookReview(bookId,this.userReview.value).subscribe({next:(res:any)=>{
    console.log(res)
    this.toastr.success("Your Review added successfully")

    }, error: (HttpErrorResponse) => {
      if(HttpErrorResponse.error.message === "jwt malformed"){
        this.router.navigate(['/user']);
      }else {
        this.toastr.error(HttpErrorResponse.error.message);
    }
    }})
   }
  }


