import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/dataTypes/typesModule';
import { UserBooksService } from 'src/app/services/user-books.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css'],
})
export class BookDetailsComponent implements OnInit {
  stars: string[] = ['star_border', 'star_border', 'star_border', 'star_border', 'star_border'];

  selectedValue: string | undefined;

  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 50];
  userReview!:FormGroup
  book: any |undefined
  comment!:string
  rating!:any
  constructor(private _book:UserBooksService, private route:ActivatedRoute,private router:Router) {
    this.userReview=new FormGroup({
      comment:new FormControl(null ,[Validators.required,Validators.maxLength(140),Validators.minLength(3)]),
      rating:new FormControl(1,Validators.required)
    })
  }

  ngOnInit(){
this.route.params.subscribe(params=>this.getBookById(params['id']))
  }
  
 onRateChange(event:number) {
    this.rating = event;
  }

onSubmit(id:number){
    // const formData= new FormData();
    // formData.append('comment', this.userReview.get('comment')?.value);
    // formData.append('rating',this.rating) 
    this._book.bookReview(id,this.userReview.value).subscribe({next:(res:any)=>{
    console.log(res)
    }, error: (HttpErrorResponse) => {
      if(HttpErrorResponse.error.message === "jwt malformed"){
        this.router.navigate(['']);
      }
    }})
   }

  getBookById(id:number){
    this._book.getBookById(id).subscribe((res:any)=>{
      console.log(res.data)
      this.book=res.data
      console.log(this.book)
    })
    }

}


