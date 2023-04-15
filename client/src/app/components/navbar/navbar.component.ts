import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

constructor(private _user:AuthService, private _route:Router){}

logout(){
  this._user.LogOut();
  this._route.navigate(['/','user'])
}

}
