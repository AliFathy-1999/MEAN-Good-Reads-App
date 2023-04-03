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
  id: number;
  firstName: string;
  lastName: string;
  img?: any;
  dob: string;
  bio?: string;
  isEdit: boolean;
}

@NgModule({})
export class TypesModule {}
