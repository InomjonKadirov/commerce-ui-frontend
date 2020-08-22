import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


    const currentUser = this.authService.currentUserValue;
    const allowedRoles = route.data.allowedRoles;
    const AuthorizedByRole = this.authService.isAuthorizedByRole(allowedRoles, currentUser.authorities);

    if (currentUser) {

      // check if route is restricted by role
      if (!AuthorizedByRole ) {
        // role not authorised so redirect to home page
        // TODO: need to create access denied component and navigate to it!
        this.router.navigate(['auth/login']);
      }

      // check if the token isExpired
      if (this.authService.isTokenExpired(currentUser.accessToken) ) {
        // role not authorised so redirect to home page
        // TODO: need to create access denied component and navigate to it!
        this.router.navigate(['auth/login']);
      }
      // authorised so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/auth/login']);
    return false;
  }

}
