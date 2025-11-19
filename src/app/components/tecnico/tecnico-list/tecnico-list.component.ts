import { Component, OnInit } from '@angular/core';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnico-list',
  templateUrl: './tecnico-list.component.html', // Aponta para o arquivo HTML
  styleUrls: ['./tecnico-list.component.css']   // Aponta para o arquivo CSS
})
export class TecnicoListComponent implements OnInit {

  tecnicos: Tecnico[] = [];
  
  displayedColumns: string[] = ['id', 'nome', 'cpf', 'email', 'acoes'];

  constructor(private service: TecnicoService) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    console.log('1. Componente chamou o serviço...'); // <--- ADICIONE ISSO
    this.service.findAll().subscribe(resposta => {
      console.log('3. Resposta chegou:', resposta);   // <--- ADICIONE ISSO
      this.tecnicos = resposta;
    });
  }
}