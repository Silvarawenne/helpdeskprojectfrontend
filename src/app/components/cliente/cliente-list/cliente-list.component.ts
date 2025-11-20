import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/clientes';
import { ClienteService } from 'src/app/services/cliente.service';


@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css']
})

export class ClienteListComponent implements OnInit{

  clientes: Cliente[]= [];

  displayedColumns: string[] = ['id', 'nome', 'cpf', 'email', 'acoes'];

  constructor(private service: ClienteService) { };

  ngOnInit(): void {
      this.findAll();
  }

  findAll(){
    this.service.findAll().subscribe(resposta => {
      this.clientes = resposta;
    });
  }
}