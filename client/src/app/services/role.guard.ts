import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

constructor(private _auth: AuthService ,private _router:Router){

}
  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const user: any = this._auth.currentUser.getValue();
    const allowedRoles = route.data['allowedRoles'];

    if (allowedRoles.includes(user.role)) {
      return true;
    }
    else {
      this._router.navigate(['/user']);
      return false;
}
  }
}