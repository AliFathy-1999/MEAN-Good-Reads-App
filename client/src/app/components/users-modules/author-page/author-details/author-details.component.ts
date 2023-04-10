import { Component } from '@angular/core';
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

  selectedValue: string | undefined;

  constructor(private _author:UserAuthorService,private route:ActivatedRoute) {}

  ngOnInit(){
    this.route.params.subscribe(params=>this.getAuthor(params['id']))
  }


getAuthor(id:number){
this._author.getAuthorsById(id).subscribe({next:res=>{
  console.log(res)
  this.author=res
}})
}

  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 50];


}
