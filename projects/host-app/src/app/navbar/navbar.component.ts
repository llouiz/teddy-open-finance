import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
    userInfo = {
      username: ''
    };
  
    constructor(
      private router: Router,
      private cookieService: CookieService
    ) {};
  
    ngOnInit() {
      this.userInfo = this.getUserInfo();
    }
  
    getUserInfo() {
      let userInfo = localStorage.getItem('userInfo');
  
      if (!userInfo) {
          userInfo = this.cookieService.get('userInfo');
      }
  
      return userInfo ? JSON.parse(userInfo) : null;
    }

    goHome() {
      this.router.navigate(['/home']);
    }

    aboutApp() {
      this.router.navigate(['/about']);
    }

    logout() {
      localStorage.removeItem('userInfo');

      this.cookieService.delete('userInfo');
      
      this.router.navigateByUrl('');
    }
}
