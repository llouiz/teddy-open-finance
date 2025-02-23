import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemComponent } from './listagem.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FooterComponent } from 'projects/host-app/src/app/footer/footer.component';
import { NavbarComponent } from 'projects/host-app/src/app/navbar/navbar.component';

describe('ListagemComponent', () => {
  let component: ListagemComponent;
  let fixture: ComponentFixture<ListagemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ListagemComponent,
        NavbarComponent,
        FooterComponent
      ],
      imports: [ RouterTestingModule, HttpClientTestingModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
