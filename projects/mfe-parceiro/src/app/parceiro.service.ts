import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import Parceiro from './parceiro.model';

const API_URL = 'https://644060ba792fe886a88de1b9.mockapi.io/v1/test/partners';

@Injectable({
  providedIn: 'root'
})
export class ParceiroService {

  constructor(private httpClient: HttpClient) { }

  cadastrar(parceiro: Parceiro): Observable<Parceiro> {
    return this.httpClient.post<Parceiro>(API_URL, parceiro);
  }

  buscaParceiros(): Observable<Parceiro[]> {
    return this.httpClient.get<Parceiro[]>(API_URL);
  }

  buscaParceiroPorId(id: number): Observable<Parceiro> {
    return this.httpClient.get<Parceiro>(`${API_URL}/${id}`);
  }

  removerParceiro(id: number): Observable<Parceiro> {
    return this.httpClient.delete<Parceiro>(`${API_URL}/${id}`);
  }

  atualizar(id: number, parceiro: Parceiro): Observable<Parceiro> {
    return this.httpClient.put<Parceiro>(`${API_URL}/${id}`, parceiro);
  }
}
