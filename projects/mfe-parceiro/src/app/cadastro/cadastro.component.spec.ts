import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroComponent } from './cadastro.component';
import { FooterComponent } from 'projects/host-app/src/app/footer/footer.component';
import { NavbarComponent } from 'projects/host-app/src/app/navbar/navbar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ParceiroService } from '../parceiro.service';
import { PARCEIROS } from '../../mock-data/parceiro';

const API_URL = 'https://644060ba792fe886a88de1b9.mockapi.io/v1/test/partners';

describe('CadastroComponent', () => {
  let component: CadastroComponent;
  let fixture: ComponentFixture<CadastroComponent>;
  let parceiroService: ParceiroService;
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
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroComponent);
    component = fixture.componentInstance;
    parceiroService = TestBed.inject(ParceiroService);
    testingController = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should register partner', () => {
    fixture = TestBed.createComponent(CadastroComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();

    // Simulando nosso usuário logado
    component.userInfo = { username: 'johndoe' };

    component.cadastroForm.setValue({ name: 'Isaac Millan', description: 'Uma descrição' });

    spyOn(component, 'onSubmit');

    fixture.detectChanges();

    const form = fixture.debugElement.nativeElement.querySelector('form');
    form.dispatchEvent(new Event('submit'));

    expect(component.onSubmit).toHaveBeenCalledTimes(1);

    let parceiro = {
        id: 4,
        name: component.cadastroForm.get('name')?.value,
        description: component.cadastroForm.get('description')?.value
    };

    PARCEIROS[parceiro.id] = parceiro;
    
    parceiroService.cadastrar(parceiro).subscribe((parceiro) => {
        expect(parceiro).toBeTruthy();
      }, err => console.log(err)
    );

    const mockReq = testingController.expectOne(API_URL);
    expect(mockReq.request.method).toEqual('POST');

    mockReq.flush(parceiro);
  });
});
