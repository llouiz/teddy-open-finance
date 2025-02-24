import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListagemModule } from './listagem/listagem.module';
import { CadastroModule } from './cadastro/cadastro.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    ListagemModule,
    CadastroModule 
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }