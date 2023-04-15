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
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    // const token = this._cookieService.get('logged');
    // console.log(token)
    // return of(token).pipe(
    //   map((token: any) => {
    //     if (token=="true") {
    //       console.log(token)
    //       return true;
    //     } else {
    //       console.log(token)
    //       this._router.navigate(['/','user']);
    //       return false;
    //     }
    //   }
    //   )
    // );

    return this._auth.user.pipe(map(user => {
      if (!user) {
        this._router.navigate(['/user']);
        return false;
      }
      return true;
    }));


  }
}

  
  

