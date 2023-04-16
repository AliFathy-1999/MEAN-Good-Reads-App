import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Category } from 'src/app/dataTypes/typesModule';
import { UserCategoryService } from 'src/app/services/user-category.service';

@Component({
  selector: 'app-category-cards',
  templateUrl: './category-cards.component.html',
  styleUrls: ['./category-cards.component.css'],
})
export class CategoryCardsComponent implements OnInit{

  categories:Category[]=[]

constructor(private _category:UserCategoryService){}
  ngOnInit(): void {
this.gitCategories()
  }

  gitCategories(){
this._category.getAllCategories().subscribe((res)=>{
  this.categories=res.data
})
  }


}
