import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { AuthGuard } from './auth.guard';
import { environment } from '../environments/environment';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

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
        remoteEntry: environment.PARCEIROS_ENTRY,
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
        remoteEntry: environment.PARCEIROS_ENTRY,
        remoteName: 'mfeParceiro',
        exposedModule: './CadastroModule'
      })
      .then((m) => m.CadastroModule).catch(err => console.log(err)
      )
  },
  {
    path: 'listagem-empresas',
    loadChildren: () =>
      loadRemoteModule({
        remoteEntry: environment.EMPRESAS_ENTRY,
        remoteName: 'mfeEmpresa',
        exposedModule: './ListagemModule'
      })
      .then((m) => m.ListagemModule).catch(err => console.log(err)
      )
      ,
      canActivate: [ AuthGuard ]
  },
  {
    path: 'cadastro-empresas',
    loadChildren: () =>
      loadRemoteModule({
        remoteEntry: environment.EMPRESAS_ENTRY,
        remoteName: 'mfeEmpresa',
        exposedModule: './CadastroModule'
      })
      .then((m) => m.CadastroModule).catch(err => console.log(err)
      )
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }]
})
export class AppRoutingModule { }
