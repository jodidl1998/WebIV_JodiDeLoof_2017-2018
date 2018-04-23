import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuardService {

  constructor(private authService: AuthenticationService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.user$.getValue()) {
      return true;
    }

    // Retain the attempted URL for redirection
    this.authService.redirectUrl = state.url;
    this.router.navigate(['/login']);
    return false;
  }
}
