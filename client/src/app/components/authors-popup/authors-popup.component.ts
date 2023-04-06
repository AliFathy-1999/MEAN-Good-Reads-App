import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { AuthorsService } from '../../services/authors.service';
import { AuthService } from 'src/app/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Author } from 'src/app/dataTypes/typesModule';
import { AuthorsTableComponent } from '../authors-table/authors-table.component';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-authors-popup',
  templateUrl: './authors-popup.component.html',
  styleUrls: ['./authors-popup.component.css'],
})
export class AuthorsPopupComponent {
  file: any = null;
  error: string = '';
  successMessage: string = '';
  newAother: object = {
    firstName: '',
    lastName: '',
    DOB: '',
    isEdit: false,
  };
  selectedFile: File | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private authorsService: AuthorsService,
    private authService: AuthService,
    private authorsTableComponent: AuthorsTableComponent,
    private cdr: ChangeDetectorRef
  ) {}
  authorsForm = new FormGroup({
    firstName: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    lastName: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    DOB: new FormControl('01/04/1998', [Validators.required, this.validateDOB.bind(this)]),
    bio: new FormControl('', [Validators.maxLength(300), Validators.minLength(30)]),
    authorImage: new FormControl(null, [Validators.required]),
  });

  validateDOB(control: AbstractControl): { [key: string]: boolean } | null {
    const DOB = new Date(control.value);
    const year = DOB.getFullYear();
    console.log(year);

    if (year >= 2010) {
      return { invalidDOB: true };
    }
    return null;
  }

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
      this.authorsTableComponent.getAuthors();
      console.log('Close');
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

    this.newAother = {
      firstName: authorsForm.get('firstName')?.value,
      lastName: authorsForm.get('lastName')?.value,
      DOB: authorsForm.get('DOB')?.value,
      authorImg: authorsForm.get('authorImg')?.value,
      isEdit: false,
    };
    this.authorsService.addAuthor(formData).subscribe(
      (res) => {
        console.log(res);
        if (res.message === 'Author Added successfully') {
          this.authorsTableComponent.getAuthors();
          this.authorsForm.reset();
          this.successMessage = 'Author added successfully!';
          this.authorsService.getAuthorsApi(1, 5).subscribe((authors: any) => {
            this.authorsService.authArr = authors;
          });
          this.authorsService.getAuthorsApi(1, 5).subscribe();
        }
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }
}
