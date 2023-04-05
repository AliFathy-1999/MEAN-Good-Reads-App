import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { AuthorsService } from '../../services/authors.service';
import { AuthService } from 'src/app/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-authors-popup',
  templateUrl: './authors-popup.component.html',
  styleUrls: ['./authors-popup.component.css'],
})
export class AuthorsPopupComponent {
  file: any = null;
  error: string = '';
  successMessage: string = '';
  selectedFile: File | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private authorsService: AuthorsService,
    private authService: AuthService
  ) {}
  authorsForm = new FormGroup({
    firstName: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    lastName: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    DOB: new FormControl(null, [Validators.required]),
    bio: new FormControl('', [Validators.maxLength(1000)]),
    authorImage: new FormControl(null, [Validators.required]),
  });

  openModel() {
    const modelDiv = document.getElementById('myModal');
    if (modelDiv != null) {
      modelDiv.style.display = 'block';
    }
  }

  closeModel() {
    const modelDiv = document.getElementById('myModal');
    if (modelDiv != null) {
      modelDiv.style.display = 'none';
    }
  }

  onFileSelected(event: any) {
    this.file = event.target.files;
  }
  addAuthor(authorsForm: FormGroup) {
    const formData = new FormData();
    formData.append('firstName', authorsForm.get('firstName')?.value);
    formData.append('lastName', authorsForm.get('lastName')?.value);
    formData.append('DOB', authorsForm.get('DOB')?.value);
    formData.append('bio', authorsForm.get('bio')?.value);
    formData.append('authorImg', this.file[0]);

    console.log(formData.get('firstName'));
    console.log(formData.get('lastName'));
    console.log(formData.get('DOB'));
    console.log(formData.get('bio'));
    console.log(formData.get('authorImg'));

    this.authService.addAuthor(formData).subscribe(
      (res) => {
        console.log(res);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );

    this.authorsForm.reset();
    this.successMessage = 'Author added successfully!';
  }
}
