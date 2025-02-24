import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemComponent } from './listagem.component';
import { FooterComponent } from 'projects/host-app/src/app/footer/footer.component';
import { NavbarComponent } from 'projects/host-app/src/app/navbar/navbar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ParceiroService } from '../parceiro.service';
import { PARCEIROS } from '../../mock-data/parceiro';

const API_URL = 'https://644060ba792fe886a88de1b9.mockapi.io/v1/test/partners';

describe('ListagemComponent', () => {
  let component: ListagemComponent;
  let parceiroService: ParceiroService;
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
    parceiroService = TestBed.inject(ParceiroService);
    testingController = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get all partners', () => {
    parceiroService.buscaParceiros().subscribe((parceiros: any) => {
      expect(parceiros).toBeTruthy();

      const segundoParceiro = parceiros.find((user: any) => user.id === 2);
      expect(segundoParceiro.name).toBe('Michael William');
    });

    // Verifica todas as requisições feitas
    const mockReq = testingController.match(API_URL);

    mockReq.forEach(req => {
      expect(req.request.method).toEqual('GET');
    });

    mockReq[0].flush(Object.values(PARCEIROS));
    mockReq[1].flush(Object.values(PARCEIROS));
  });

  it('should get partner by id', () => {
    const idDoParceiroASerAtualizado = 1;

    parceiroService.buscaParceiroPorId(1).subscribe((parceiro: any) => {
      expect(parceiro).toBeTruthy();
      expect(parceiro.name).toBe('Thomas Robert');
    });

    const mockReq = testingController.expectOne(`${API_URL}/${idDoParceiroASerAtualizado}`);
    expect(mockReq.request.method).toEqual('GET');
    mockReq.flush(PARCEIROS[1]);
  });

  it('should update the partner', () => {
    const idDoParceiroASerAtualizado = 1;

    let partner = { description: 'Nova descrição' };

    parceiroService.atualizar(idDoParceiroASerAtualizado, partner).subscribe((partner: any) => {
      expect(partner).toBeTruthy();
      expect(partner.id).toBe(idDoParceiroASerAtualizado);
    });

    const mockReq = testingController.expectOne(`${API_URL}/${idDoParceiroASerAtualizado}`);
    expect(mockReq.request.method).toEqual('PUT');

    let modifiedPartner = PARCEIROS[1];
    modifiedPartner.description = 'Nova descrição';

    expect(mockReq.request.body.description).toEqual(partner.description);

    mockReq.flush(modifiedPartner);
  });

  it('should delete the partner', () => {
    const idDoParceiroASerRemovido = 1;

    parceiroService.removerParceiro(idDoParceiroASerRemovido).subscribe((partnerId: any) => {
      expect(partnerId).toBeTruthy();
  
      expect(partnerId).toBe(idDoParceiroASerRemovido);
    });

    const mockReq = testingController.expectOne(`${API_URL}/${idDoParceiroASerRemovido}`);
    expect(mockReq.request.method).toEqual('DELETE');

    mockReq.flush(idDoParceiroASerRemovido);
  });
});
