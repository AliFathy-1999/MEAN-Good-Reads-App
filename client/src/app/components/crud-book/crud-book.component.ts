import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BooksService } from 'src/app/services/books.service';


@Component({
  selector: 'app-crud-book',
  templateUrl: './crud-book.component.html',
  styleUrls: ['./crud-book.component.css']
})
export class CrudBookComponent implements OnInit{
 bookForm:FormGroup;
  bookName!:String;
  categoryId!:Number;
  authorId!:Number;
  photo!:any;


  onFileSelected(event:Event) {
      const file= event.target as HTMLInputElement  
      if(file.files)
      {
        var reader= new FileReader();
        reader.onload = (event:any) => {
          this.bookForm.value.photo=event.target.result;       
       }
        reader.readAsDataURL(file.files[0]);
      }  
}


  constructor(private _book:BooksService, 
    private _dialogRef:MatDialogRef<CrudBookComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any) {
   this.bookForm = new FormGroup({
      photo: new FormControl(null,[Validators.required]),
      bookName : new FormControl(null,[Validators.required,Validators.minLength(3)]),
      categoryId:new FormControl(null,[Validators.required]),
      authorId:new FormControl(null,[Validators.required]),
    })
  }

  submitData(){
      if(this.data){
     this._book.editBook(this.data.id,this.bookForm.value).subscribe((res:any)=>{
     console.log(res)
     this._dialogRef.close(true);
})
      }else{
        this._book.addBook(this.bookForm.value).subscribe((res:any)=>{
        console.log(res)
        this._dialogRef.close(true);
          })
      }
  }

  ngOnInit():void{
this.bookForm.patchValue(this.data)
  }

  closeDialog(){
    this._dialogRef.close();
  }
}

