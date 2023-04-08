import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { TypesModule, User, Author } from '../../dataTypes/typesModule';
import { AuthorsService } from '../../services/authors.service';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-authors-table',
  templateUrl: './authors-table.component.html',
  styleUrls: ['./authors-table.component.css'],
})
export class AuthorsTableComponent implements OnInit {
  authArr: Array<any> = [];
  newAuthArr: Array<Author> = [];
  file: any = null;
  selectedFile: File | undefined;
  page: number = 1;
  count: number = 0;
  pageSize: number = 4;
  collectionSize: number = 100;
  @ViewChild('authorForm') form: NgForm | undefined;

  authorsForm = new FormGroup({
    firstName: new FormControl([Validators.minLength(3), Validators.maxLength(15)]),
    lastName: new FormControl([Validators.minLength(3), Validators.maxLength(15)]),
    DOB: new FormControl('01/04/1998', [Validators.required, this.validateDOB.bind(this)]),
    bio: new FormControl('Please Add The Author Bio Here', [Validators.maxLength(300), Validators.minLength(30)]),
    authorImg: new FormControl(null, [Validators.required]),
  });

  constructor(
    private authorsService: AuthorsService,
    private deletePopup: MatDialog,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
    console.log(this.authArr);
  }

  validateDOB(control: AbstractControl): { [key: string]: boolean } | null {
    const DOB = new Date(control.value);
    const year = DOB.getFullYear();
    console.log(year);

    if (year >= 2010) {
      return { invalidDOB: true };
    }
    return null;
  }

  ngOnInit(): void {
    this.getAuthors();
    console.log(this.authArr);
  }

  getAuthors() {
    this.authorsService.getAuthorsApi(1, 10).subscribe((data: any) => {
      this.authArr = data;

      return this.authArr;
    });
  }

  onEdit(id: number, authorForm: any) {
    this.authArr.forEach((author) => {
      author.isEdit = author._id === id;
      console.log((author.isEdit = author._id === id));
    });

    const author = this.authorsService.getAuthorById(id);
    console.log(author, typeof id, id);
    // Set the form controls to the existing values
    authorForm.controls['firstName'].setValue(author?.firstName);
    authorForm.controls['lastName'].setValue(author?.lastName);
    authorForm.controls['DOB'].setValue(author?.DOB);
    authorForm.controls['bio'].setValue(author?.bio);
    authorForm.controls['authorImg'].setValue(author?.authorImg);
  }

  onFileSelected(event: any) {
    this.file = event.target.files;
  }

  onDelete(id: number) {
    if (confirm('Are you sure you want to delete this author?')) {
      this.authorsService.deleteAuthor(id).subscribe(
        () => {
          // If the delete request is successful, remove the author from the array of authors
          this.toastr.success('Deleted Succesfully');
          this.authArr = this.authArr.filter((a) => a._id !== id);
        },
        (error) => {
          this.toastr.success(error.message);
        }
      );
    }
  }

  onUpdate(id: number, authorsForm: FormGroup) {
    if (authorsForm.invalid) {
      this.toastr.error('Form is invalid');
      return;
    }
    const author = this.authArr.find((author) => author._id === id);

    if (!author) {
      this.toastr.error(`Author with ID ${id} not found.`);
      return;
    }

    const formData = new FormData();
    formData.append('firstName', authorsForm.get('firstName')?.value);
    formData.append('lastName', authorsForm.get('lastName')?.value);
    formData.append('DOB', authorsForm.get('DOB')?.value);
    formData.append('bio', authorsForm.get('bio')?.value);
    formData.append('authorImg', this.file[0]);

    console.log(formData.get('bio'));

    this.authorsService.updateAuthor(id, formData).subscribe(
      () => {
        console.log(`Author with ID ${id} updated successfully.`);
        author.isEdit = false;
        this.toastr.success(`Author with ID ${id} updated successfully.`);

        this.authorsService.getAuthorsApi(1, 5).subscribe((data: any) => {
          this.authArr = data;
        });
      },
      (error: any) => {
        this.toastr.error(error.error.err);
      }
    );
  }
}
