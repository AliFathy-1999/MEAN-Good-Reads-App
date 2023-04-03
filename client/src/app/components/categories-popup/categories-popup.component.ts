import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-categories-popup',
  templateUrl: './categories-popup.component.html',
  styleUrls: ['./categories-popup.component.css']
})
export class CategoriesPopupComponent {

  constructor(private formBuilder: FormBuilder) {
  }
  categoryForm = new FormGroup ({
    categoryName: new FormControl(null, [Validators.required, Validators.minLength(3),Validators.maxLength(15)]),
  })

  openModel() {
    const modelDiv = document.getElementById('myModal');
    if(modelDiv!= null) {
      modelDiv.style.display = 'block';
    } 
  }

  CloseModel() {
    const modelDiv = document.getElementById('myModal');
    if(modelDiv!= null) {
      modelDiv.style.display = 'none';
      
    } 
  }

}
