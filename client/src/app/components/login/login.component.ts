import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm:FormGroup
  username:String="";
  password:String="";
constructor(){
  
this.loginForm = new FormGroup({
  username : new FormControl(null,[Validators.required,Validators.minLength(13)]),
  password : new FormControl(null,[Validators.required,Validators.minLength(8)])
}) 
}

login() {
  console.log(this.loginForm.value);
}
}
