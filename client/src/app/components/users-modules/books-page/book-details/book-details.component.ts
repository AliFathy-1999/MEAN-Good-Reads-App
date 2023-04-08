import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/dataTypes/typesModule';
import { UserBooksService } from 'src/app/services/user-books.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css'],
})
export class BookDetailsComponent implements OnInit {
  stars: string[] = ['star', 'star', 'star', 'star_half', 'star_border'];

  selectedValue: string | undefined;

  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 50];

  book: Book |undefined
  constructor(private _book:UserBooksService, private route:ActivatedRoute) {}

  ngOnInit(){
this.route.params.subscribe(params=>this.getBookById(params['id']))
  }

  getBookById(id:number){
    this._book.getBookById(id).subscribe((res:any)=>{
      console.log(res.data)
      this.book=res.data
      console.log(this.book)
    })
    }

}


