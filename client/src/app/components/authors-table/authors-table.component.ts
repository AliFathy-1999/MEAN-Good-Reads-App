import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { TypesModule, User, Author } from '../../dataTypes/typesModule';
import { AuthorsService } from '../../services/authors.service';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { PageEvent } from '@angular/material/paginator';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-authors-table',
  templateUrl: './authors-table.component.html',
  styleUrls: ['./authors-table.component.css'],
})
export class AuthorsTableComponent implements OnInit {
  authArr: Array<any> = [];
  Oldauthor: any;
  newAuthArr: Array<Author> = [];
  file :any;

  selectedFile: File | undefined;
  page: number = 1;
  count: number = 0;
  pageSize!: number;
  data!: number;
  totalCount!: number;
  totalPages!: number;
  collectionSize: number = 100;
  imageUrl: SafeUrl | undefined;

  @ViewChild('authorForm') form: NgForm | undefined;
  currentPageIndex: number = 1;
  authorsForm = new FormGroup({
    firstName: new FormControl([Validators.minLength(3), Validators.maxLength(15)]),
    lastName: new FormControl([Validators.minLength(3), Validators.maxLength(15)]),
    DOB: new FormControl(null, [this.validateDOB.bind(this)]),
    bio: new FormControl([Validators.maxLength(300), Validators.minLength(30)]),
  });

  constructor(
    private authorsService: AuthorsService,
    private deletePopup: MatDialog,
    private authService: AuthService,
    private toastr: ToastrService,
    private sanitizer: DomSanitizer
  ) {}

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
    this.authorsService.getAuthorsApi(this.currentPageIndex, 4).subscribe((result) => {
      this.authArr = result.docs;
      this.totalCount = result.totalDocs;
      this.totalPages = result.totalPages;
    });
    console.log(this.authArr);
  }

  getAuthors() {
    this.authorsService.getAuthorsApi(this.currentPageIndex, 4).subscribe((data: any) => {
      this.authArr = data.docs;
      this.totalCount = data.totaalDocs;
      this.totalPages = data.totalPages;
      return this.authArr;
    });
  }

  onEdit(id: number, authorForm: any) {
    this.Oldauthor = this.authArr.find((author) => author._id === id);

    if (Array.isArray(this.authArr)) {
      this.authArr.forEach((author) => {
        author.isEdit = author._id === id;
      });
    }

    this.authorsForm.get('DOB')?.setValue(this.Oldauthor.DOB.split('T')[0]);
  }

  onFileSelected(event: any) {
    this.file = event.target.files;
  }

  onPageChanged(event: PageEvent) {
    const newPageIndex = event.pageIndex;
    const newPageSize = event.pageSize;
    if (newPageIndex !== this.currentPageIndex || newPageSize !== this.pageSize) {
      this.currentPageIndex = newPageIndex;
      this.pageSize = newPageSize;
      this.authorsService.getAuthorsApi(this.currentPageIndex, this.pageSize).subscribe((result) => {
        this.authArr = result.docs;
        this.totalCount = result.totalDocs;
      });
    }
  }

  onPreviousPage() {
    if (this.currentPageIndex > 1) {
      this.currentPageIndex--;
      this.authorsService.getAuthorsApi(this.currentPageIndex, 4).subscribe((result) => {
        this.authArr = result.docs;
        this.totalCount = result.totaalDocs;
      });
    }
  }

  onNextPage() {
    if (this.currentPageIndex < this.totalPages) {
      console.log(this.currentPageIndex);
      this.currentPageIndex++;
      this.authorsService.getAuthorsApi(this.currentPageIndex, 4).subscribe((result) => {
        this.authArr = result.docs;
        this.totalCount = result.totalDocs;
      });
    }
  }

  onDelete(id: number) {
    if (confirm('Are you sure you want to delete this author?')) {
      this.authorsService.deleteAuthor(id).subscribe(
        () => {
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
    formData.append(
      'firstName',
      authorsForm.get('firstName')?.value ? this.Oldauthor.firstName : authorsForm.get('firstName')?.value
    );
    formData.append(
      'lastName',
      authorsForm.get('lastName')?.value ? this.Oldauthor.lastName : authorsForm.get('lastName')?.value
    );
    formData.append('DOB', authorsForm.get('DOB')?.value ? authorsForm.get('DOB')?.value : this.Oldauthor.DOB);
    formData.append('bio', authorsForm.get('bio')?.value ? authorsForm.get('bio')?.value : this.Oldauthor.bio);
    // formData.append('authorImg', this.file && this.file.length > 0 ? this.file[0] : this.Oldauthor.authorImg);
    if(this.file && this.file.length){
    formData.append('authorImg',this.file[0]);
    this.file=[]
    }
    author.isEdit = false;
    this.authorsService.updateAuthor(id, formData).subscribe(
      () => {
        this.getAuthors();
        author.isEdit = false;
        this.toastr.success(`Author with ID ${id} updated successfully.`);
      },
      (error: any) => {
        this.toastr.error(error.error.message);
      }
    );
  }
}
