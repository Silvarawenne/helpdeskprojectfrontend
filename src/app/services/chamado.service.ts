import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Chamado } from '../models/chamado';

@Injectable({
  providedIn: 'root'
})
export class ChamadoService {

  baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  findAll(): Observable<Chamado[]> {
    return this.http.get<Chamado[]>(`${this.baseUrl}/chamados`);
  }

  findById(id: any): Observable<Chamado> {
    return this.http.get<Chamado>(`${this.baseUrl}/chamados/${id}`);
  }

  create(chamado: Chamado): Observable<Chamado> {
    return this.http.post<Chamado>(`${this.baseUrl}/chamados`, chamado);
  }

  update(chamado: Chamado): Observable<Chamado> {
    return this.http.put<Chamado>(`${this.baseUrl}/chamados/${chamado.id}`, chamado);
  }
}