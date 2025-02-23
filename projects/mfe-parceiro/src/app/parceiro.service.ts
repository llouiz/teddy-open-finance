import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const API_URL = 'https://644060ba792fe886a88de1b9.mockapi.io/v1/test/partners';

@Injectable({
  providedIn: 'root'
})
export class ParceiroService {

  constructor(private httpClient: HttpClient) { }

  cadastrar(parceiro: any): Observable<any> {
    return this.httpClient.post<any>(API_URL, parceiro);
  }

  buscaParceiros(): Observable<any[]> {
    return this.httpClient.get<any[]>(API_URL);
  }

  buscaParceiroPorId(id: number): Observable<any> {
    return this.httpClient.get<any>(`${API_URL}/${id}`);
  }

  removerParceiro(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${API_URL}/${id}`);
  }

  atualizar(id: number, parceiro: any): Observable<any> {
    return this.httpClient.put<any>(`${API_URL}/${id}`, parceiro);
  }
}
