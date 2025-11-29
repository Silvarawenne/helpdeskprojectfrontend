import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Cliente } from 'src/app/models/clientes';
import { ClienteService } from 'src/app/services/cliente.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css']
})
export class ClienteListComponent implements OnInit {

  clientes: Cliente[] = [];
  displayedColumns: string[] = ['id', 'nome', 'cpf', 'email', 'acoes'];

  constructor(
    private service: ClienteService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.findAll();

    // Recarrega a lista toda vez que a rota voltar para /clientes
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        if (event.url === '/clientes') {
          this.findAll();
        }
      });
  }

  findAll() {
    this.service.findAll().subscribe(resposta => {
      this.clientes = resposta;
    });
  }
}
