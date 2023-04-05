import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-categories-popup',
  templateUrl: './categories-popup.component.html',
  styleUrls: ['./categories-popup.component.css']
})
export class CategoriesPopupComponent implements OnInit{
id!:number

  constructor(private formBuilder: FormBuilder,private _category:CategoriesService) {
  }
  ngOnInit(): void {
    // this.
  }
  categoryForm = new FormGroup ({
    categoryName: new FormControl(null, [Validators.required, Validators.minLength(3),Validators.maxLength(15)]),
  })


  CloseModel() {
    const modelDiv = document.getElementById('myModal');
    if(modelDiv!= null) {
      modelDiv.style.display = 'none';
      
    } 
  }

  openModel() {
    const modelDiv = document.getElementById('myModal');
    if(modelDiv!= null) {
      modelDiv.style.display = 'block';
    } 
  }

// editCategory(){
//         this._category.editCategory(id,this.categoryForm.value).subscribe((res)=>{
//         this._category.getCategory()
//       })
// }

  submitCategory(){
      this._category.addCategory(this.categoryForm.value).subscribe((res)=>{
        console.log(res)
        this.categoryForm.reset();
            // this.CloseModel()
            if(res){
              this._category.getCategory();
            }
      })
  }


}
