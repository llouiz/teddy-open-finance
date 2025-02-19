import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  checked: boolean = false;

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(
    private router: Router,
    private cookieService: CookieService
  ) {};
  
  ngOnInit() {}

  check(value: any) {
    this.checked = value;
  }

  onSubmit() {
    const userInfo = {
      username: this.loginForm.value.username,
    };

    // Se o checkbox não for marcado, salva no localStorage
    if (!this.checked) {
      // Remove do cookie e salva no localStorage
        this.cookieService.delete('userInfo');

        localStorage.setItem('userInfo', JSON.stringify(userInfo));
    }

    // Se o checkbox for marcado, salva no cookie
    if (this.checked) {
        // Remove do localStorage e salva no cookie
        localStorage.removeItem('userInfo');

        this.cookieService.set('userInfo', JSON.stringify(userInfo));
    }

    // Redireciona para a página inicial
    this.router.navigateByUrl('home');
  }
}
