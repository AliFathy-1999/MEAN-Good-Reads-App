import { Component } from '@angular/core';

@Component({
  selector: 'app-authors-popup',
  templateUrl: './authors-popup.component.html',
  styleUrls: ['./authors-popup.component.css']
})
export class AuthorsPopupComponent {
  openModel() {
    const modelDiv = document.getElementById('myModal');
    if(modelDiv!= null) {
      modelDiv.style.display = 'block';
    } 
  }

  CloseModel() {
    const modelDiv = document.getElementById('myModal');
    if(modelDiv!= null) {
      modelDiv.style.display = 'none';
      
    } 
  }



}
