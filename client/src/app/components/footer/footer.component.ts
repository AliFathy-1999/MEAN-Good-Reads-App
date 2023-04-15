import { Component, OnInit } from '@angular/core';
import { UserAuthorService } from 'src/app/services/user-author.service';
import { UserBooksService } from 'src/app/services/user-books.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit{

authors!:any
books!:any

constructor(private _book:UserBooksService,private _author:UserAuthorService){}
  ngOnInit(){
    this.getPopularBooks();
    this.getPopularAuthors();
  }

getPopularBooks(){
  this._book.getPopular().subscribe((res)=>{
    console.log(res)
    this.books=res.data;
  })
}

getPopularAuthors(){
  this._author.getPopularAuthors().subscribe((res)=>{
    console.log(res.data)
    this.authors=res.data;
  })
}

}
