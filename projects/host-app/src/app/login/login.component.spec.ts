import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';

import { LoginComponent } from './login.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieService } from 'ngx-cookie-service';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let cookieService: CookieService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        LoginComponent,
        NavbarComponent,
        FooterComponent
      ],
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule,
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        MatMenuModule
      ],
      providers: [ CookieService ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    cookieService = TestBed.inject(CookieService),
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should login', () => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    
    component.loginForm.setValue({ username: 'johndoe', password: 'senha' });

    expect(component.loginForm.get('username')?.value).not.toBe('');
    expect(component.loginForm.get('password')?.value).not.toBe('');

    component.checked = true;

    spyOn(component, 'onSubmit');

    fixture.detectChanges();

    const form = fixture.debugElement.nativeElement.querySelector('form');
    form.dispatchEvent(new Event('submit'));

    expect(component.onSubmit).toHaveBeenCalledTimes(1);

    const userInfo = {
      username: component.loginForm.get('username')?.value
    };

    let username: any = '';

    if (component.checked) {
        localStorage.removeItem('userInfo');

        cookieService.set('userInfo', JSON.stringify(userInfo));

        username = JSON.parse(cookieService.get('userInfo')).username;
    }

    if (!component.checked) {
        cookieService.delete('userInfo');

        localStorage.setItem(`userInfo`, JSON.stringify(userInfo));

        username = JSON.parse(localStorage.getItem('userInfo') || '').username;
    }
    
    expect(username).not.toBe('');
  });
});
