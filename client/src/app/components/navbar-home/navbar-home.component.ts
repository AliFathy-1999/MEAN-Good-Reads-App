import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-navbar-home',
  templateUrl: './navbar-home.component.html',
  styleUrls: ['./navbar-home.component.css']
})
export class NavbarHomeComponent {

  loginForm:FormGroup
  userName:String="";
  password:String="";
constructor(){
  
this.loginForm = new FormGroup({
  userName : new FormControl(null,[Validators.required,Validators.minLength(13)]),
  password : new FormControl(null,[Validators.required,Validators.minLength(8)])
}) 
}

login() {
  console.log(this.loginForm.value);
}

}
