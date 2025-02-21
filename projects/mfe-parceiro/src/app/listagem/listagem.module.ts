import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListagemComponent } from './listagem.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'projects/host-app/src/app/shared/shared.module';
import { PaginationComponent } from '../pagination/pagination.component';

@NgModule({
  declarations: [
    ListagemComponent,
    PaginationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: ListagemComponent
      }
    ])
  ]
})
export class ListagemModule { }
