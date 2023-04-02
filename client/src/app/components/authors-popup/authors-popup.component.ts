import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-authors-popup',
  templateUrl: './authors-popup.component.html',
  styleUrls: ['./authors-popup.component.css']
})
export class AuthorsPopupComponent {

  constructor(private formBuilder: FormBuilder){

  }
  authorsForm = new FormGroup ({
    firstName: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    lastName: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    dob: new FormControl(null, [Validators.required]),
    authorImage: new FormControl(null, [Validators.required])
  });

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
