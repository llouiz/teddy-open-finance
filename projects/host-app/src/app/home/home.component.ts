import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  userInfo = {
    username: ''
  };

  constructor(
    private router: Router,
    private cookieService: CookieService
  ) {};

  ngOnInit() {
    this.userInfo = this.getUserInfo();

    if (!this.userInfo) {
      this.router.navigateByUrl('');
    }
  }

  getUserInfo() {
    let userInfo = localStorage.getItem('userInfo');

    if (!userInfo) {
        userInfo = this.cookieService.get('userInfo');
    }

    return userInfo ? JSON.parse(userInfo) : null;
  }
}
