import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import Empresa from './empresa.model';

const API_URL = 'https://655cf25525b76d9884fe3153.mockapi.io/v1/external-companies';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  constructor(private httpClient: HttpClient) { }

  cadastrar(empresa: Empresa): Observable<Empresa> {
    return this.httpClient.post<Empresa>(API_URL, empresa);
  }

  buscaEmpresas(): Observable<Empresa[]> {
    return this.httpClient.get<Empresa[]>(API_URL);
  }

  buscaEmpresaPorId(id: number): Observable<Empresa> {
    return this.httpClient.get<Empresa>(`${API_URL}/${id}`);
  }

  removerEmpresa(id: number): Observable<Empresa> {
    return this.httpClient.delete<Empresa>(`${API_URL}/${id}`);
  }

  atualizar(id: number, empresa: Empresa): Observable<Empresa> {
    return this.httpClient.put<Empresa>(`${API_URL}/${id}`, empresa);
  }
}
