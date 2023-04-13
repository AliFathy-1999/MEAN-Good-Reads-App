import { Component, OnInit } from '@angular/core';
import { UserAuthorService } from 'src/app/services/user-author.service';

@Component({
  selector: 'app-author-cards',
  templateUrl: './author-cards.component.html',
  styleUrls: ['./author-cards.component.css'],
})
export class AuthorCardsComponent implements OnInit{

constructor(private _author:UserAuthorService){}

  ngOnInit(): void {
 this.getAuthors()
  }

  author:any

getAuthors(){
  this._author.getAuthors(1,5).subscribe({next:(res)=>{

    console.log(res)
    this.author=res;

  }})
}

  pageSize = 8;
  pageSizeOptions = [4, 8, 12];

}
