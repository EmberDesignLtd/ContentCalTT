import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Route } from './../enums/route';
import { LoginService } from './../login/login.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private readonly loginService: LoginService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.loginService.loggedIn.value) {
      return true;
    }

    this.router.navigate([Route.LOGIN], {
      queryParams: { returnUrl: state.url },
    });
    return false;
  }
}
