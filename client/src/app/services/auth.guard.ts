import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable, map, of } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{

  constructor(private _auth: AuthService ,private _router:Router,private _cookieService: CookieService){}
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean {
    // return this._auth.user.pipe(map(user => {
    //   if (!user) {
    //     this._router.navigate(['/user']);
    //     return false;
    //   }
    //   return true;
    // }));
  const user=this._auth.currentUser.getValue();
  if(this._auth.currentUser.getValue()!==null){
    return true;
  }else{
    this._router.navigate(['/user']);
    return false;
  }

  }
}

  
  

