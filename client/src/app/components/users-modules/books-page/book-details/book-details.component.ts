import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/dataTypes/typesModule';
import { UserBooksService } from 'src/app/services/user-books.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css'],
})
export class BookDetailsComponent implements OnInit {
  stars: string[] = ['star_border', 'star_border', 'star_border', 'star_border', 'star_border'];

  selectedValue: string | undefined;
  errorMessage!:string;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 50];
  userReview!:FormGroup
  book: any |undefined
  // review!:string
  rating!:any
  userObj={
    review:'',
    rating:0
  }
  constructor(private _book:UserBooksService, private route:ActivatedRoute,private router:Router,private _route:ActivatedRoute,private toastr: ToastrService,
    ) {
    this.userReview=new FormGroup({
      review:new FormControl('',[Validators.maxLength(140),Validators.minLength(3)]),
      rating:new FormControl(1,Validators.required)
    })
  }

  ngOnInit(){
this.route.params.subscribe(params=>this.getBookById(params['id']))
  }
  
 onRateChange(event:number) {
    this.rating = event;
  }

onSubmit(){
  
    // const formData= new FormData();
    // formData.append('review', this.userReview.get('review')?.value);
    // formData.append('rating',this.rating) 
    // console.log(formData.get('review'))
    // console.log(formData.get('rating'))

    this.userObj.review=this.userReview.get('review')?.value;
    this.userObj.rating=this.rating;
    const bookId = this.route.snapshot.params['id'];

    this._book.bookReview(bookId,this.userObj).subscribe({next:(res:any)=>{
    console.log(res)
    }, error: (HttpErrorResponse) => {
      if(HttpErrorResponse.error.message === "jwt malformed"){
        this.router.navigate(['/user']);
      }else {
        this.toastr.error(HttpErrorResponse.error.message);
    }
    }})
   }

  getBookById(id:number){
    this._book.getBookById(id).subscribe((res:any)=>{
      console.log(res.data)
      this.book=res.data.book
      console.log(this.book)
    })
    }
  }


