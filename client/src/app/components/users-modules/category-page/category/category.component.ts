import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/dataTypes/typesModule';
import { UserCategoryService } from 'src/app/services/user-category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit{

books:Book[]=[]

constructor(private _category:UserCategoryService,private route:ActivatedRoute){}
  ngOnInit(){
this.route.params.subscribe(params=>this.getBooks(params['id']))
  }

getBooks(id:number){
this._category.getCategoryBooks(id,1,4).subscribe((res:any)=>{
  this.books=res.data.docs
  console.log(this.books)
})
}

  pageSize = 8;
  pageSizeOptions = [4, 8, 12];
}
