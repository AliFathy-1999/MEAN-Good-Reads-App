import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
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
  user!:any;
  logged!: boolean;
constructor(private _AuthService :AuthService, private _cookieService:CookieService, private _router:Router,private toastr: ToastrService,){
this.loginForm = new FormGroup({
  userName : new FormControl(null,[Validators.required,Validators.minLength(8)]),
  password : new FormControl(null,[Validators.required,Validators.minLength(8)])
})
}

login() {
    this._AuthService.login(this.loginForm.value).subscribe({next:
      (res) => {
        this._cookieService.delete('token');
        console.log(res.token);
        console.log(res);
        this._cookieService.set('token', res.token);
        this._AuthService.saveCurrentUser();
        const user=this._AuthService.currentUser.getValue();
        console.log(user);
        if(user.role == 'user'){
          this._router.navigate(['/user/','home'])
        }else{
          this._router.navigate(['/admin/','categories'])
        }
      },
      error: (HttpErrorResponse) => {
        console.log(HttpErrorResponse)
        if(HttpErrorResponse.error.message==="un-authenticated"){
          this.errorMessage="Check Your Username or Password"
          this.toastr.error(this.errorMessage)
        }
        }})
      };
}

