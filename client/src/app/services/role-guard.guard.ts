import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardGuard implements CanActivate {

constructor(private _auth: AuthService ,private _router:Router){}
  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // const myObject = JSON.parse(localStorage.getItem('user') || '{}');
    // const myValue = myObject.user.role;
    // if(myValue == "user"){
    //   this._router.navigate(['/user']);
    //   localStorage.removeItem('user');
    //   return false;
    // }
    // console.log(myValue)
    // return true;

    const user=this._auth.currentUser.getValue();
    const allowedRoles = route.data['allowedRoles'];
    console.log(user)
    if (allowedRoles.includes(user.role)) {
      return true;
  }
  else {
      this._router.navigate(['/user']);
      return false;
  }

  
  }
  
}
