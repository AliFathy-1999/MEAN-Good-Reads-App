import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

constructor(private _user:AuthService, private _route:Router,private _cookieService:CookieService){}

logout(){
  this._user.LogOut().subscribe((res)=>{   
    this._cookieService.deleteAll();
    this._route.navigate(['/','user'])

  });
}

}
