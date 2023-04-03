import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import {AuthorsService} from '../../services/authors.service';
@Component({
  selector: 'app-authors-popup',
  templateUrl: './authors-popup.component.html',
  styleUrls: ['./authors-popup.component.css']
})
export class AuthorsPopupComponent {
  file:any = null;
  error:string = '';
  successMessage: string = '';
  selectedFile: File | undefined;

  constructor(private formBuilder: FormBuilder,private authorsService:AuthorsService){

  }
  authorsForm = new FormGroup ({
    firstName: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    lastName: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    dob: new FormControl(null, [Validators.required]),
    bio: new FormControl('' ,[Validators.maxLength(1000)]),
    authorImage: new FormControl(null, [Validators.required])
  });

  openModel() {
    const modelDiv = document.getElementById('myModal');
    if(modelDiv!= null) {
      modelDiv.style.display = 'block';
    } 
  }

  closeModel() {
    const modelDiv = document.getElementById('myModal');
    if(modelDiv!= null) {
      modelDiv.style.display = 'none';
      
    } 
  }

  onFileSelected(event: any) {
    this.file = event.target.files;
  }
  addAuthor(authorsForm:FormGroup){

    const formData = new FormData();
    formData.append('firstName', authorsForm.get('firstName')?.value);
    formData.append('lastName', authorsForm.get('lastName')?.value);
    formData.append('dob', authorsForm.get('dob')?.value);
    formData.append('bio', authorsForm.get('bio')?.value);
    formData.append('authorImage', this.file[0]);
  
    this.authorsService.addAuthor(formData);   
    this.authorsForm.reset();
    this.successMessage = 'Author added successfully!';

  }

}
