import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-authors-table',
  templateUrl: './authors-table.component.html',
  styleUrls: ['./authors-table.component.css']
})

export class AuthorsTableComponent implements OnInit {

  usersArray = [
    {
      "id": 1,
      "firstName": "Leanne",
      "lastName": "Bret",
      "img": "image.jpg",
       "dob": "25/05/1999",
      "isEdit": false
    },
    {
      "id": 2,
      "firstName": "Ervin",
      "lastName": "Antonette",
      "img": "image.jpg",
       "dob": "25/05/1999",
      "isEdit": false
    },
    {
      "id": 3,
      "firstName": "Clementine",
      "lastName": "Samantha",
      "img": "image.jpg",
       "dob": "25/05/1999",
      "isEdit": false
    },
    {
      "id": 4,
      "firstName": "Patricia",
      "lastName": "Karianne",
      "img": "image.jpg",
       "dob": "25/05/1979",
      "isEdit": false
    },
    {
      "id": 5,
      "firstName": "Chelsey",
      "lastName": "Kamren",
      "img": "image.jpg",
       "dob": "25/05/1945",
      "isEdit": false
    },
    {
      "id": 6,
      "firstName": "Dennis",
      "lastName": "Leopoldo_Corkery",
      "img": "image.jpg",
       "dob": "25/05/1967",
      "isEdit": false
    },
    {
      "id": 7,
      "firstName": "Kurtis",
      "lastName": "Elwyn.Skiles",
      "img": "image.jpg",
       "dob": "25/05/1989",
      "isEdit": false
    },
    {
      "id": 8,
      "firstName": "Nicholas",
      "lastName": "Maxime_Nienow",
      "img": "image.jpg",
       "dob": "25/05/1999",
      "isEdit": false
    },
    {
      "id": 9,
      "firstName": "Glenna",
      "lastName": "Delphine",
      "img": "image.jpg",
       "dob": "25/05/1957",
      "isEdit": false
    },
    {
      "id": 10,
      "firstName": "Clementina",
      "lastName": "Moriah.Stanton",
      "img": "image.jpg",
       "dob": "25/05/1999",
      "isEdit": false
    }
  ]

  

  constructor() { }


  authorsForm = new FormGroup ({
    firstName: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    lastName: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    dob: new FormControl(null, [Validators.required]),
    authorImage: new FormControl(null, [Validators.required])
  });
  ngOnInit(): void {
  }
  onEdit(item: any) {
    debugger;
    this.usersArray.forEach(element => {
      element.isEdit = false;
    });
    item.isEdit = true;
  }

}
