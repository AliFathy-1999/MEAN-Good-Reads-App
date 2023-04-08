import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/dataTypes/typesModule';
import { UserCategoryService } from 'src/app/services/user-category.service';

@Component({
  selector: 'app-category-cards',
  templateUrl: './category-cards.component.html',
  styleUrls: ['./category-cards.component.css'],
})
export class CategoryCardsComponent implements OnInit{
  // categories = [
  //   { id: 1, name: 'Science Fiction', icon: 'science' },
  //   { id: 2, name: 'Fantasy', icon: 'terrain' },
  //   { id: 3, name: 'Mystery', icon: 'mystery' },
  //   { id: 4, name: 'Romance', icon: 'favorite' },
  //   { id: 5, name: 'Thriller', icon: 'dangerous' },
  //   { id: 6, name: 'Historical Fiction', icon: 'history' },
  // ];

  categories:Category[]=[]

constructor(private _category:UserCategoryService){}
  ngOnInit(): void {
this.gitCategories()
  }

  gitCategories(){
this._category.getAllCategories().subscribe((res)=>{
  this.categories=res.data
  console.log(res)
})
  }


}
