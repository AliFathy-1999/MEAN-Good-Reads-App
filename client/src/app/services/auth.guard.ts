import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

constructor(private _auth: AuthService ,private _router:Router){}

  canActivate(){
if(this._auth.isLogged()){
  return true;
}else{
  this._router.navigate(['/','login'])
  return false
}
  }
  
}
