import { Component, OnInit, OnDestroy } from '@angular/core'; // Adicionado OnDestroy
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';
import { Router, NavigationEnd } from '@angular/router'; // Adicionado Router e NavigationEnd
import { Subscription } from 'rxjs'; // Necessário para limpar a subscrição

@Component({
  selector: 'app-tecnico-list',
  templateUrl: './tecnico-list.component.html',
  styleUrls: ['./tecnico-list.component.css']
})
export class TecnicoListComponent implements OnInit, OnDestroy { // Implementação de OnDestroy

  tecnicos: Tecnico[] = [];
  displayedColumns: string[] = ['id', 'nome', 'cpf', 'email', 'acoes'];

  // Variável para gerenciar a subscrição do Router
  routerSubscription: Subscription;

  // Construtor: Injeta o Router e configura a subscrição de eventos
  constructor(private service: TecnicoService, private router: Router) { 
      
      this.routerSubscription = this.router.events.subscribe((event) => {
          // Verifica se a navegação terminou
          if (event instanceof NavigationEnd) {
              // Verifica se a rota atual é a de listagem de técnicos
              if (event.urlAfterRedirects === '/tecnicos' || event.urlAfterRedirects === '/tecnicos/') {
                  this.findAll(); // Força a recarga dos dados
              }
          }
      });
  }

  ngOnInit(): void {
    // Mantém o findAll() para a carga inicial da página
    this.findAll();
  }
  
  // NOVO: Método para limpar a subscrição ao destruir o componente
  ngOnDestroy(): void {
      if (this.routerSubscription) {
          this.routerSubscription.unsubscribe();
      }
  }

  findAll() {
    this.service.findAll().subscribe(resposta => {
      this.tecnicos = resposta;
    });
  }
}