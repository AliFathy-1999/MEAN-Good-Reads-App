import { Component, OnInit } from '@angular/core';
import { UserBooksService } from 'src/app/services/user-books.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit{

constructor(private _book:UserBooksService){}
  ngOnInit(){
    this.getPopularBooks();
  }

getPopularBooks(){
  this._book.getPopular().subscribe((res)=>{
    console.log(res)
  })
}

}
