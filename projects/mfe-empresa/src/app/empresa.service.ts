import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const API_URL = 'https://655cf25525b76d9884fe3153.mockapi.io/v1/external-companies';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  constructor(private httpClient: HttpClient) { }

  cadastrar(empresa: any): Observable<any> {
    return this.httpClient.post<any>(API_URL, empresa);
  }

  buscaEmpresas(): Observable<any[]> {
    return this.httpClient.get<any[]>(API_URL);
  }

  removerEmpresa(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${API_URL}/${id}`);
  }

  atualizar( empresa: any): Observable<any> {
    const { id } = empresa;

    return this.httpClient.put<any>(`${API_URL}/${id}`, empresa);
  }
}
