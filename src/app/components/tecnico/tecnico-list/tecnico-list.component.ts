import { Component, OnInit } from '@angular/core';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';

// REMOVIDOS OnDestroy, Router e Subscription

@Component({
  selector: 'app-tecnico-list',
  templateUrl: './tecnico-list.component.html',
  styleUrls: ['./tecnico-list.component.css']
})
export class TecnicoListComponent implements OnInit { // APENAS OnInit

  tecnicos: Tecnico[] = [];
  displayedColumns: string[] = ['id', 'nome', 'cpf', 'email', 'acoes'];

  // Construtor Simples
  constructor(private service: TecnicoService) { } 

  ngOnInit(): void {
    // Apenas a chamada básica de dados
    this.findAll();
  }
  
  findAll() {
    this.service.findAll().subscribe(resposta => {
      this.tecnicos = resposta;
    });
  }
  // ngOnDestroy() e lógica de router foram removidos
}