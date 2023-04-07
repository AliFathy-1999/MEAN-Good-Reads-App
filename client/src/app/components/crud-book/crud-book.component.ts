import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BooksService } from 'src/app/services/books.service';


@Component({
  selector: 'app-crud-book',
  templateUrl: './crud-book.component.html',
  styleUrls: ['./crud-book.component.css'],
})
export class CrudBookComponent implements OnInit{
//  bookForm:FormGroup;
  name!:String;
  description!:String;
  categoryId!:Number;
  authorId!:Number;
  bookImage!:any;
  file: any;


  onFileSelected(event:any) {
      // const file= event.target as HTMLInputElement  
      // if(file.files)
      // {
      //   var reader= new FileReader();
      //   reader.onload = (event:any) => {
      //     this.bookForm.value.bookImage=event.target.result;       
      //  }
      //   reader.readAsDataURL(file.files[0]);
      // }  
      this.file = event.target.files;
}


  constructor(private _book:BooksService, 
    private _dialogRef:MatDialogRef<CrudBookComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any) {
  //  this.bookForm = new FormGroup({
  //     bookImage: new FormControl(null),
  //     name : new FormControl(null,[Validators.required,Validators.minLength(3)]),
  //     description:new FormControl(null,[Validators.required,]),
  //     categoryId:new FormControl(null,[Validators.required]),
  //     authorId:new FormControl(null,[Validators.required]),
  //   })
  }

  bookForm = new FormGroup({
    name : new FormControl(null,[Validators.required,Validators.minLength(3)]),
    description:new FormControl(null,[Validators.required,]),
    categoryId:new FormControl(null,[Validators.required]),
    authorId:new FormControl(null,[Validators.required]),
    bookImage: new FormControl(null)
  })

  submitData( bookForm: FormGroup){
      if(this.data){
     this._book.editBook(this.data.id,this.bookForm.value).subscribe((res:any)=>{
     console.log(res.data)
     this._dialogRef.close(true);
},
(error: HttpErrorResponse) => {
  console.log(error);
})
      }else{
        const formData = new FormData();
        formData.append('name', bookForm.get('name')?.value);
        formData.append('description', bookForm.get('description')?.value);
        formData.append('categoryId', bookForm.get('categoryId')?.value);
        formData.append('authorId', bookForm.get('authorId')?.value);
        formData.append('bookImage', this.file[0]);
        console.log(formData)
        console.log(formData.get('name'))
        console.log(formData.get('description'))
        console.log(formData.get('categoryId'))
        console.log(formData.get('authorId'))
        console.log(formData.get('bookImage'))
        this._book.addBook(formData).subscribe((res:any)=>{
        this._dialogRef.close(true);
          },
          (error: HttpErrorResponse) => {
            console.log(error);
          })
      }
  }

  ngOnInit(): void {
    this.bookForm.patchValue(this.data);
  }

  closeDialog() {
    this._dialogRef.close();
  }
}
