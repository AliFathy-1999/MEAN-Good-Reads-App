import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm:FormGroup
  userName:String="";
  password:String="";
constructor(private _AuthService :AuthService){
  
this.loginForm = new FormGroup({
  userName : new FormControl(null,[Validators.required,Validators.minLength(8)]),
  password : new FormControl(null,[Validators.required,Validators.minLength(8)])
}) 
}


login() {
  
 
    console.log(this.loginForm.value);
    
    this._AuthService.login(this.loginForm.value).subscribe(
      (res) => {
        console.log(res.token);
        console.log(res);
        localStorage.setItem('token',res.token);
      },
      (error: HttpErrorResponse) => {
        console.error('Error status code:', error.status);
        console.error('Error message:', error.message);
      }
    );
  
}
}