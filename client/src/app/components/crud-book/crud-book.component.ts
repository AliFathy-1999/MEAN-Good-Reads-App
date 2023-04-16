import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
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
  oldData:any
  
  onFileSelected(event: any) {
    this.file = event.target.files;
  }

  constructor(
    private _book: BooksService,
    private toastr: ToastrService,
    private _dialogRef: MatDialogRef<CrudBookComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  bookForm = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    description: new FormControl(null, [Validators.required, Validators.minLength(30), Validators.maxLength(120)]),
    categoryId: new FormControl(null, [Validators.required]),
    authorId: new FormControl(null, [Validators.required]),
    bookImage: new FormControl(null),
  });

  submitData(bookForm: FormGroup) {
    if (this.data) {
      const formData = new FormData();
      formData.append(
        'description',
        bookForm.get('description')?.value ? bookForm.get('description')?.value : this.oldData.description
      );
      formData.append(
        'name',
        bookForm.get('name')?.value ? bookForm.get('name')?.value : this.oldData.name
      );
      formData.append(
        'categoryId',
        bookForm.get('categoryId')?.value ? bookForm.get('categoryId')?.value : this.oldData.categoryId
      );
      formData.append(
        'authorId',
        bookForm.get('authorId')?.value ? bookForm.get('authorId')?.value : this.oldData.authorId
      );
      if(this.file && this.file.length){
        formData.append('bookImage',this.file[0] )
      }
      this._book.editBook(this.data.id, formData).subscribe({
        next:(res: any) => {
          console.log(res.data);
          this._dialogRef.close(true);
        },
        error: (HttpErrorResponse) => {
          this.toastr.error(HttpErrorResponse.error.message);
        }
    });
    }else{
      const formData = new FormData();
      formData.append('name', bookForm.get('name')?.value);
      formData.append('description', bookForm.get('description')?.value);
      formData.append('categoryId', bookForm.get('categoryId')?.value);
      formData.append('authorId', bookForm.get('authorId')?.value);
      formData.append('bookImage', this.file[0]);
      console.log(formData.get('name'))
      console.log(formData.get('description'))
      console.log(formData.get('categoryId'))
      console.log(formData.get('authorId'))
      console.log(formData.get('bookImage'))


      this._book.addBook(formData).subscribe({next:(res: any)=> {
          this._dialogRef.close(true);
          console.log(res);
        },error: (HttpErrorResponse) => {
          this.toastr.error(HttpErrorResponse.error.message);
        }
        // error: (HttpErrorResponse) => {
        //   console.log(HttpErrorResponse);
        //   if(HttpErrorResponse.error.message===" Value of field name is Duplicated please choose another one"){
        //     this.nameMessage="The name is already entered before"
        //   }else if(HttpErrorResponse.error.message === "Category or Author isn't valid"){
        //     this.catMessage="Category or Author number is wrong"
        //   },

        
      });
    
    }
    
  }


  ngOnInit(): void {
    this.bookForm.patchValue(this.data);
  }

  closeDialog() {
    this._dialogRef.close();
  }
}
