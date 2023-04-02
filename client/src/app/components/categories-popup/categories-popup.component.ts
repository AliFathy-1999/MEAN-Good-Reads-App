import { Component } from '@angular/core';

@Component({
  selector: 'app-categories-popup',
  templateUrl: './categories-popup.component.html',
  styleUrls: ['./categories-popup.component.css']
})
export class CategoriesPopupComponent {

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
