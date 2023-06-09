import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from 'src/app/services/categories.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-categories-popup',
  templateUrl: './categories-popup.component.html',
  styleUrls: ['./categories-popup.component.css'],
})
export class CategoriesPopupComponent implements OnInit {
  categoryForm:FormGroup;
  name!:String;

  constructor(private _category: CategoriesService, private toastr: ToastrService,private _dialogRef:MatDialogRef<CategoriesPopupComponent>, @Inject(MAT_DIALOG_DATA) public data:any) {

    this.categoryForm = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    });

  }
  ngOnInit(): void {
    this.categoryForm.patchValue(this.data)

  }

  submitCategory() {
    if(this.data){
      this._category.updateCategory(this.data._id,this.categoryForm.value).subscribe((res)=>{
        this._dialogRef.close(true);
      }, (error: any) => {
        this.toastr.error(error.error.message);
      })
    }else{
      this._category.addCategory(this.categoryForm.value).subscribe((res) => {
        this._dialogRef.close(true); 
    },(error: any) => {
      this.toastr.error(error.error.message);
    });
    }


  }

  closeDialog(){
    this._dialogRef.close();
  }
}
