import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemComponent } from './listagem.component';
import { FooterComponent } from 'projects/host-app/src/app/footer/footer.component';
import { NavbarComponent } from 'projects/host-app/src/app/navbar/navbar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EmpresaService } from '../empresa.service';
import { EMPRESAS } from '../../mock-data/empresa';

const API_URL = 'https://655cf25525b76d9884fe3153.mockapi.io/v1/external-companies';

describe('ListagemComponent', () => {
  let component: ListagemComponent;
  let empresaService: EmpresaService;
  let testingController: HttpTestingController;
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
    empresaService = TestBed.inject(EmpresaService);
    testingController = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get all companies', () => {
    empresaService.buscaEmpresas().subscribe((empresas: any) => {
      expect(empresas).toBeTruthy();

      const segundaEmpresa = empresas.find((empresa: any) => empresa.id === 2);
      expect(segundaEmpresa.name).toBe('Instagram');
    });

    // Verifica todas as requisições feitas
    const mockReq = testingController.match(API_URL);

    mockReq.forEach(req => {
      expect(req.request.method).toEqual('GET');
    });

    mockReq[0].flush(Object.values(EMPRESAS));
    mockReq[1].flush(Object.values(EMPRESAS));
  });

  it('should get company by id', () => {
    const idDaEmpresa = 1;

    empresaService.buscaEmpresaPorId(1).subscribe((empresa: any) => {
      
      expect(empresa).toBeTruthy();
      expect(empresa.name).toBe('Facebook');
    });

    const mockReq = testingController.expectOne(`${API_URL}/${idDaEmpresa}`);
    expect(mockReq.request.method).toEqual('GET');
    mockReq.flush(EMPRESAS[1]);
  });

  it('should update the company', () => {
    const idDaEmpresaASerAtualizada = 1;

    let company = { description: 'Nova descrição' };

    empresaService.atualizar(idDaEmpresaASerAtualizada, company).subscribe((company: any) => {
      expect(company).toBeTruthy();
      expect(company.id).toBe(idDaEmpresaASerAtualizada);
    });

    const mockReq = testingController.expectOne(`${API_URL}/${idDaEmpresaASerAtualizada}`);
    expect(mockReq.request.method).toEqual('PUT');

    let modifiedCompany = EMPRESAS[1];
    modifiedCompany.description = 'Nova descrição';

    expect(mockReq.request.body.description).toEqual(company.description);

    mockReq.flush(modifiedCompany);
  });

  it('should delete the company', () => {
    const idDaEmpresaASerRemovida = 1;

    empresaService.removerEmpresa(idDaEmpresaASerRemovida).subscribe((companyId: any) => {
      expect(companyId).toBeTruthy();
  
      expect(companyId).toBe(idDaEmpresaASerRemovida);
    });

    const mockReq = testingController.expectOne(`${API_URL}/${idDaEmpresaASerRemovida}`);
    expect(mockReq.request.method).toEqual('DELETE');

    mockReq.flush(idDaEmpresaASerRemovida);
  });
});
