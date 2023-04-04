import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { TypesModule, User, Author } from '../../dataTypes/typesModule';
import { AuthorsService } from '../../services/authors.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-authors-table',
  templateUrl: './authors-table.component.html',
  styleUrls: ['./authors-table.component.css']
})
export class AuthorsTableComponent implements OnInit {
  authArr: Array<Author> = [];
  file:any = null;
  selectedFile: File | undefined;
  page: number = 1;
  count: number = 0;
  pageSize: number = 4;
  collectionSize: number = 100;;

  authorsForm = new FormGroup ({
    firstName: new FormControl([Validators.minLength(3), Validators.maxLength(15)]),
    lastName: new FormControl([Validators.minLength(3), Validators.maxLength(15)]),
    dob: new FormControl(),
    bio: new FormControl(),
    authorImage: new FormControl()
  });

  constructor(private authorsService: AuthorsService, private deletePopup:MatDialog) {}

  ngOnInit(): void {
    this.authArr = this.authorsService.getAuthors();
  }

  get paginatedData() {
    return this.authorsService.getAuthors().slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }
  onEdit(id: number, authorForm:any) {
    this.authorsService.editAuthor(id);
    this.authArr = this.authorsService.getAuthors();
    const author = this.authorsService.getAuthorById(id);

    // Set the form controls to the existing values
    authorForm.controls['firstName'].setValue(author?.firstName);
    authorForm.controls['lastName'].setValue(author?.lastName);
    authorForm.controls['dob'].setValue(author?.dob);
    authorForm.controls['bio'].setValue(author?.bio);
    authorForm.controls['authorImage'].setValue(author?.img);    
  }

  onFileSelected(event: any) {
    this.file = event.target.files;
  }

  onDelete(id: number) {
    this.authorsService.deleteAuthor(id);
    this.authArr = this.authorsService.getAuthors();
  }


  onUpdate(id:number ,authorsForm:any){
    console.log(authorsForm.get('firstName')?.value);

    const authorIndex = this.authArr.findIndex((author) => author.id === id);

    if (!authorsForm) {
      alert('authorsForm is null');
      return;
    }
    const formData = new FormData();
    formData.append('firstName', authorsForm.get('firstName')?.value);
    formData.append('lastName', authorsForm.get('lastName')?.value);
    formData.append('dob', authorsForm.get('dob')?.value);
    formData.append('bio', authorsForm.get('bio')?.value);
    formData.append('authorImage', this.file[0]);
    console.log(formData.get('firstName'));
    
    this.authorsService.updateAuthor(id, formData)
    this.authArr = this.authorsService.getAuthors();
  }

}
