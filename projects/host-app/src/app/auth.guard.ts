import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private cookieService: CookieService 
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isLoggedIn = !!localStorage.getItem('userInfo'); 
    const isLoggedInCookie = !!this.cookieService.get('userInfo');

    if (!isLoggedIn && !isLoggedInCookie) {
      console.log('hereeee');
      
      // Armazena o link compartilhado antes do redirecionamento
      localStorage.setItem('redirectUrl', state.url);

      this.router.navigate(['']);
      return false;
    }

    return true;
  }
}
