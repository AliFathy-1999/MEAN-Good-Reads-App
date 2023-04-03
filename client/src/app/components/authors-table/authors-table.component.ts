import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { TypesModule, User, Author } from '../../dataTypes/typesModule';
import { AuthorsService } from '../../services/authors.service';

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
  tableSize: number = 3;
  tableSizes: any = [5,10,15,20];

  authorsForm = new FormGroup ({
    firstName: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    lastName: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    dob: new FormControl(null, [Validators.required]),
    bio: new FormControl(null, [Validators.maxLength(10000)]),
    authorImage: new FormControl(null, [Validators.required])
  });

  constructor(private authorsService: AuthorsService) {}

  

  ngOnInit(): void {
    this.authArr = this.authorsService.getAuthors();
  }

    onTableChange(event:any){
      this.tableSize = event.target.value;
      this.page =1;
      this.authArr;
    }
  onEdit(id: number) {
    this.authorsService.editAuthor(id);
    this.authArr = this.authorsService.getAuthors();
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
