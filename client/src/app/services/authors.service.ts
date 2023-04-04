import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TypesModule, User, Author } from '../dataTypes/typesModule';

@Injectable({
  providedIn: 'root'
})
// Service to manage authors data
export class AuthorsService {
  authArr: Array<Author> = [
    { 
      id: 1,
      firstName: 'Leanne',
      lastName: 'Bret',
      img: 'image.jpg',
      dob: '25/05/1999',
      bio:
        'An author is the writer of a book, article, play, or other written work. A broader definition of the word  states: An author is the person who originated or gave existence to anything and whose authorship determines responsibility for what was created.',
      isEdit: false
    },
    {
      id: 2,
      firstName: 'Ervin',
      lastName: 'Antonette',
      img: 'image.jpg',
      dob: '25/05/1999',
      isEdit: false
    },
    {
      id: 3,
      firstName: 'Clementine',
      lastName: 'Samantha',
      img: 'image.jpg',
      dob: '25/05/1999',
      isEdit: false
    },
    {
      id: 4,
      firstName: 'Patricia',
      lastName: 'Karianne',
      img: 'image.jpg',
      dob: '25/05/1979',
      isEdit: false
    },
    {
      id: 5,
      firstName: 'Chelsey',
      lastName: 'Kamren',
      img: 'image.jpg',
      dob: '25/05/1945',
      isEdit: false
    },
    {
      id: 6,
      firstName: 'Dennis',
      lastName: 'Leopoldo_Corkery',
      img: 'image.jpg',
      dob: '25/05/1967',
      isEdit: false
    },
    {
      id: 7,
      firstName: 'Kurtis',
      lastName: 'Elwyn.Skiles',
      img: 'image.jpg',
      dob: '25/05/1989',
      isEdit: false
    },
    {
      id: 8,
      firstName: 'Nicholas',
      lastName: 'Maxime_Nienow',
      img: 'image.jpg',
      dob: '25/05/1999',
      isEdit: false
    },
    {
      id: 9,
      firstName: 'Glenna',
      lastName: 'Delphine',
      img: 'image.jpg',
      dob: '25/05/1957',
      isEdit: false
    },
    {
      id: 10,
      firstName: 'Clementina',
      lastName: 'Moriah.Stanton',
      img: 'image.jpg',
      dob: '25/05/1999',
      isEdit: false
    }
  ];

  constructor() {}

  getAuthorById(id: number): Author | undefined {
    return this.authArr.find(author => author.id === id);
  }
  
  getAuthors(): any {
    return this.authArr;
  }

  editAuthor(id: number) {
    this.authArr.forEach(author => {
      author.isEdit = (author.id === id);
    });
  }

  deleteAuthor(id: number) {
    const index = this.authArr.findIndex(author => author.id === id);
    if (index >= 0) {
      this.authArr.splice(index, 1);
      this.authArr = [...this.authArr];
    }
  }

  addAuthor(authorForm: any): void {
    let author: Author = {
      id: this.authArr.length + 1,
      firstName: authorForm.get('firstName'),
      lastName: authorForm.get('lastName'),
      dob: authorForm.get('dob'),
      bio: authorForm.get('bio'),
      img: authorForm.get('authorImage'),
      isEdit: false
    };

    console.log(author);
    
    this.authArr.push(author);
  }

  updateAuthor(id: number, newAuthorForm: any): void {
    const authorIndex = this.authArr.findIndex((author) => author.id === id);

    if (authorIndex !== -1) {
      const authorToUpdate = this.authArr[authorIndex];
      authorToUpdate.firstName = newAuthorForm.get('firstName');
      authorToUpdate.lastName = newAuthorForm.get('lastName');
      authorToUpdate.dob = newAuthorForm.get('dob');
      authorToUpdate.bio = newAuthorForm.get('bio');
      authorToUpdate.img = newAuthorForm.get('authorImage');
      authorToUpdate.isEdit = false;

      console.log(authorToUpdate);
      
    } else {
      alert(`Author with ID ${id} does not exist in the array.`);
    }
  }

  
}
