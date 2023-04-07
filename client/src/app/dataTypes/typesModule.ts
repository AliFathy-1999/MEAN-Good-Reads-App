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
  id:number;
  title:string;
  author:string;
  description:string;
  category:string;
  rating:number;
  imageUrl:string;
}

@NgModule({})
export class TypesModule {}
