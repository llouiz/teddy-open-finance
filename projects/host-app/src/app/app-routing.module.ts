import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';

const LOGIN_ENTRY = 'http://localhost:4300/remoteEntry.js';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'login',
    loadChildren: () =>
      loadRemoteModule({
        remoteEntry: LOGIN_ENTRY,
        remoteName: 'mfeLogin',
        exposedModule: './LoginModule'
      })
      .then((m) => m.LoginModule).catch(err => console.log(err)
      )
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
