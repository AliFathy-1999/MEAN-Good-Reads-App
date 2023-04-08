import { NgModule } from '@angular/core';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  img?: any;
  dob?: string;
  isEdit: boolean;
  bio?: string;
}

export interface Author {
  _id: number;
  firstName: string;
  lastName: string;
  authorImg?: any;
  DOB: string;
  bio?: string;
  isEdit: boolean;
}

export interface Category {
  id: number;
  categoryName: string;
  isEdit: boolean;
}

export interface Book{
  // data:{
    _id:number;
    name:string;
    categoryId:{
      _id:number;
      name:string;
    }
  // },
  authorId:{
    _id:number;
    firstName:string;
    lastName:string;
  }
  bookImage:string;
  description:string;
  ratingsNumber:number;
  avergeRatings:number;
  reviwes:[{
    comment:string;
    user:{
      _id:string;
      firstName:string;
      lastName:string;
    }
    ratings:number;
    _id:string
  }]
}

@NgModule({})
export class TypesModule {}
