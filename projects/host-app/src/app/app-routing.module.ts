import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { AuthGuard } from './auth.guard';

const PARCEIROS_ENTRY = 'http://localhost:4300/remoteEntry.js';

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
    path: 'listagem-parceiros',
    loadChildren: () =>
      loadRemoteModule({
        remoteEntry: PARCEIROS_ENTRY,
        remoteName: 'mfeParceiro',
        exposedModule: './ListagemModule'
      })
      .then((m) => m.ListagemModule).catch(err => console.log(err)
      )
      ,
      canActivate: [ AuthGuard ]
  },
  {
    path: 'cadastro-parceiros',
    loadChildren: () =>
      loadRemoteModule({
        remoteEntry: PARCEIROS_ENTRY,
        remoteName: 'mfeParceiro',
        exposedModule: './CadastroModule'
      })
      .then((m) => m.CadastroModule).catch(err => console.log(err)
      )
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
