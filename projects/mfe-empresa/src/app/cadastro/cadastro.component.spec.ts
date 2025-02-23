import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroComponent } from './cadastro.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { FooterComponent } from 'projects/host-app/src/app/footer/footer.component';
import { NavbarComponent } from 'projects/host-app/src/app/navbar/navbar.component';
import { EMPRESAS } from '../../mock-data/empresa';
import { EmpresaService } from '../empresa.service';

const API_URL = 'https://655cf25525b76d9884fe3153.mockapi.io/v1/external-companies';

describe('CadastroComponent', () => {
  let component: CadastroComponent;
  let fixture: ComponentFixture<CadastroComponent>;
  let empresaService: EmpresaService;
  let testingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CadastroComponent,
        NavbarComponent,
        FooterComponent
      ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        MatMenuModule
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroComponent);
    component = fixture.componentInstance;
    empresaService = TestBed.inject(EmpresaService);
    testingController = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should register company', () => {
      fixture = TestBed.createComponent(CadastroComponent);
      component = fixture.componentInstance;
  
      fixture.detectChanges();
  
      // Simulando nosso usuário logado
      component.userInfo = { username: 'johndoe' };
  
      component.cadastroForm.setValue({ name: 'Empresa LTDA', description: 'Uma descrição', collaboratorsCount: '25' });
  
      spyOn(component, 'onSubmit');
  
      fixture.detectChanges();
  
      const form = fixture.debugElement.nativeElement.querySelector('form');
      form.dispatchEvent(new Event('submit'));
  
      expect(component.onSubmit).toHaveBeenCalledTimes(1);
  
      let empresa = {
          id: 4,
          name: component.cadastroForm.get('name')?.value,
          description: component.cadastroForm.get('description')?.value
      };
  
      EMPRESAS[empresa.id] = empresa;
      
      empresaService.cadastrar(empresa).subscribe((empresa) => {
          expect(empresa).toBeTruthy();
        }, err => console.log(err)
      );
  
      const mockReq = testingController.expectOne(API_URL);
      expect(mockReq.request.method).toEqual('POST');
  
      mockReq.flush(empresa);
    });
});
