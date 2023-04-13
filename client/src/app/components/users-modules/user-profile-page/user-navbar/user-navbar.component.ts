import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.css'],
})
export class UserNavbarComponent {

constructor(private _cookieService:CookieService, private _router:Router,private _auth:AuthService){}

logout(){
  this._router.navigate([''])
  return this._cookieService.delete('token');
}

}



