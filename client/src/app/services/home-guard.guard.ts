import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class HomeGuardGuard implements CanActivate {
  constructor(private _auth: AuthService ,private _router:Router,private _cookieService: CookieService){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

  const user=this._auth.currentUser.getValue();
  if(this._auth.currentUser.getValue()!==null){
    if (user.role=="admin") {
      this._router.navigate(['/author'])
  }else if(user.role=="user"){
    this._router.navigate(['/categories'])
  }
    return false;
  }else{
    return true;
  }
  }

    }
  

