import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { TypesModule, User, Author } from '../../dataTypes/typesModule';
import { AuthorsService } from '../../services/authors.service';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-authors-table',
  templateUrl: './authors-table.component.html',
  styleUrls: ['./authors-table.component.css'],
})
export class AuthorsTableComponent implements OnInit {
  authArr: Array<Author> = [];
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
    DOB: new FormControl(),
    bio: new FormControl(),
    authorImage: new FormControl(),
  });

  constructor(
    private authorsService: AuthorsService,
    private deletePopup: MatDialog,
    private authService: AuthService
  ) {
    console.log(this.authArr);
  }

  ngOnInit(): void {
    this.authService.getAuthorsApi(0, 10).subscribe((data: any) => {
      this.authArr = data;

      this.authArr = this.authArr.map((author: Author) => {
        const imagePath = author.authorImg;
        const imageUrl = imagePath ? 'assets/' + imagePath.split('assets/')[1] : '';
        return {
          ...author,
          authorImg: imageUrl,
        };
      });
      console.log(this.authArr);
    });
  }

  get paginatedData() {
    return this.authorsService
      .getAuthors()
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }
  onEdit(id: number, authorForm: any) {
    this.authorsService.editAuthor(id);
    this.authArr = this.authorsService.getAuthors();
    const author = this.authorsService.getAuthorById(id);
    console.log(author, typeof id, id);
    this.authorsService.editAuthor(id);
    // Set the form controls to the existing values
    authorForm.controls['firstName'].setValue(author?.firstName);
    authorForm.controls['lastName'].setValue(author?.lastName);
    authorForm.controls['DOB'].setValue(author?.DOB);
    authorForm.controls['bio'].setValue(author?.bio);
    authorForm.controls['authorImage'].setValue(author?.authorImg);
  }

  onFileSelected(event: any) {
    this.file = event.target.files;
  }

  onDelete(id: number) {
    this.authorsService.deleteAuthor(id);
    this.authArr = this.authorsService.getAuthors();
  }

  onUpdate(id: number, authorsForm: any) {
    console.log(authorsForm.get('firstName')?.value);

    const authorIndex = this.authArr.findIndex((author) => author._id === id);
    const currentAuthor = this.authArr.find((author) => {
      return author._id === id;
    });

    if (!authorsForm) {
      alert('authorsForm is null');
      return;
    }
    console.log(this.form);

    const formData = new FormData();
    formData.append('firstName', authorsForm.get('firstName')?.value);
    formData.append('lastName', authorsForm.get('lastName')?.value);
    formData.append('DOB', authorsForm.get('DOB')?.value);
    formData.append('bio', authorsForm.get('bio')?.value);
    formData.append('authorImage', this.file[0]);
    console.log(formData.get('firstName'));

    this.authorsService.updateAuthor(id, formData);
    this.authArr = this.authorsService.getAuthors();
  }
}
