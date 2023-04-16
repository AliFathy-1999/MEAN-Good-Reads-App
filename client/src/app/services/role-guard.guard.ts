import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardGuard implements CanActivate {

constructor(private _auth: AuthService ,private _router:Router){

}
  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const user=this._auth.currentUser.getValue();
    const allowedRoles = route.data['allowedRoles'];
    console.log(allowedRoles)
    if (allowedRoles.includes(user.role)) {
      return true;
  }
  else {
      this._router.navigate(['/user']);
      return false;
  }
}
  }
  

  //   if(this._auth.currentUser.getValue() != null){
//     if(this._auth.currentUser.getValue().role === 'admin'){
//       return true;
//     }
//     alert('un authorized')
//     this._router.navigate(['/user/','home']);
//     return false;
//   }
//   else {
//     this._router.navigate(['/admin/books']);
//     return false;
//   }
// }


    // const myObject = JSON.parse(localStorage.getItem('user') || '{}');
    // const myValue = myObject.user.role;
    // if(myValue == "user"){
    //   this._router.navigate(['/user']);
    //   localStorage.removeItem('user');
    //   return false;
    // }
    // console.log(myValue)
    // return true;