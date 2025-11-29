import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tecnico } from '../models/tecnico';

@Injectable({
  providedIn: 'root'
})

export class TecnicoService {
  baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  findAll(): Observable<Tecnico[]> {
    return this.http.get<Tecnico[]>(`${this.baseUrl}/tecnicos`);
  }


  create(tecnico: Tecnico): Observable<Tecnico> {
    return this.http.post<Tecnico>(`${this.baseUrl}/tecnicos`, tecnico);
  }

  findById(id: any): Observable<Tecnico> {
    return this.http.get<Tecnico>(`${this.baseUrl}/tecnicos/${id}`);
  }

  update(tecnico: Tecnico): Observable<Tecnico> {
    return this.http.put<Tecnico>(`${this.baseUrl}/tecnicos/${tecnico.id}`, tecnico);
  }

  delete(id: any): Observable<Tecnico> {
    return this.http.delete<Tecnico>(`${this.baseUrl}/tecnicos/${id}`);
  }
}