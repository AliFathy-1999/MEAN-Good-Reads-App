import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  errorMessage!: string;
  loginForm:FormGroup
  userName:String="";
  password:String="";
constructor(private _AuthService :AuthService, private _cookieService:CookieService, private _router:Router){

this.loginForm = new FormGroup({
  userName : new FormControl(null,[Validators.required,Validators.minLength(8)]),
  password : new FormControl(null,[Validators.required,Validators.minLength(8)])
})
}


login() {
    console.log(this.loginForm.value);
    this._AuthService.login(this.loginForm.value).subscribe({next:
      (res) => {
        this._cookieService.delete('token');
        console.log(res.token);
        console.log(res);
        this._cookieService.set('token', res.token);
        this._router.navigate(['/','home'])

      },
      error: (HttpErrorResponse) => {
        console.log(HttpErrorResponse)
        if(HttpErrorResponse.error.message==="un-authenticated"){
          this.errorMessage="Check Your Username or Password"
        }
        }
             }       )
      };
}

