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
export class CrudBookComponent implements OnInit {
  //  bookForm:FormGroup;
  nameMessage!:string
  catMessage!:string
  name!: String;
  description!: String;
  categoryId!: Number;
  authorId!: Number;
  bookImage!: any;
  file: any;

  onFileSelected(event: any) {
    this.file = event.target.files;
  }

  constructor(
    private _book: BooksService,
    private _dialogRef: MatDialogRef<CrudBookComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  bookForm = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    description: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(120)]),
    categoryId: new FormControl(null, [Validators.required]),
    authorId: new FormControl(null, [Validators.required]),
    bookImage: new FormControl(null),
  });

  submitData(bookForm: FormGroup) {
    if (this.data) {
      const updatedValues :any = {};
      let hasUpdatedImage = false; 
      for (const key in bookForm.value) {
        if (bookForm.value.hasOwnProperty(key)) {
          const currentValue = bookForm.value[key];
          const originalValue = this.data[key];
          if (currentValue !== originalValue) {
            updatedValues[key] = currentValue;
            if (key === "bookImage" && currentValue) {
              hasUpdatedImage = true;
            }
          }
        }
      }
      console.log(updatedValues);
      const formData = new FormData();
      if (hasUpdatedImage) {
        formData.append("bookImage", this.file[0]);
        console.log(formData.get('bookImage'))
        // delete updatedValues["bookImage"];
      }
      for (const key in updatedValues) {
        if (updatedValues.hasOwnProperty(key)) {
          formData.append(key, updatedValues[key]);
          console.log(formData.get('bookImage'))
        }
      }
      this._book.editBook(this.data.id, updatedValues).subscribe({
        next:(res: any) => {
          console.log(updatedValues)
          console.log(res.data);
          this._dialogRef.close(true);
        },
        error: (HttpErrorResponse) => {
          console.log(HttpErrorResponse);
        }
    });
    }else{
      const formData = new FormData();
      formData.append('name', bookForm.get('name')?.value);
      formData.append('description', bookForm.get('description')?.value);
      formData.append('categoryId', bookForm.get('categoryId')?.value);
      formData.append('authorId', bookForm.get('authorId')?.value);
      formData.append('bookImage', this.file[0]);
      console.log(formData);
      console.log(formData.get('name'));
      console.log(formData.get('description'));
      console.log(formData.get('categoryId'));
      console.log(formData.get('authorId'));
      console.log(formData.get('bookImage'));{
      this._book.addBook(formData).subscribe({ 
        next:(res: any)=> {
          this._dialogRef.close(true);
          console.log(res);
        },
        error: (HttpErrorResponse) => {
          console.log(HttpErrorResponse);
          if(HttpErrorResponse.error.message===" Value of field name is Duplicated please choose another one"){
            this.nameMessage="The name is already entered before"
          }else if(HttpErrorResponse.error.message === "Category or Author isn't valid"){
            this.catMessage="Category or Author number is wrong"
          }
        }
      });
    }
    }
    
  }
  // addBook(bookForm: FormGroup) {
  //   const formData = new FormData();
  //   formData.append('name', bookForm.get('name')?.value);
  //   formData.append('description', bookForm.get('description')?.value);
  //   formData.append('categoryId', bookForm.get('categoryId')?.value);
  //   formData.append('authorId', bookForm.get('authorId')?.value);
  //   formData.append('bookImage', this.file[0]);
  //   console.log(formData);
  //   console.log(formData.get('name'));
  //   console.log(formData.get('description'));
  //   console.log(formData.get('categoryId'));
  //   console.log(formData.get('authorId'));
  //   console.log(formData.get('bookImage'));
  //   this._book.addBook(formData).subscribe(
  //     (res: any) => {
  //       this._dialogRef.close(true);
  //       console.log(res);
  //       console.log(formData.get('name'));
  //     },
  //     (error: HttpErrorResponse) => {
  //       console.log(error);
  //     }
  //   );
  // }

  ngOnInit(): void {
    this.bookForm.patchValue(this.data);
  }

  closeDialog() {
    this._dialogRef.close();
  }
}
