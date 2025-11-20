import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/clientes';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-update',
  templateUrl: './cliente-update.component.html',
  styleUrls: ['./cliente-update.component.css']
})
export class ClienteUpdateComponent implements OnInit {

  cliente: Cliente = {
    id: '',
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    perfis: [],
    dataCriacao: ''
  }

  nome = new FormControl(null, [Validators.minLength(3)]);
  cpf = new FormControl(null, [Validators.required]);
  email = new FormControl(null, [Validators.email]);
  senha = new FormControl(null, [Validators.minLength(3)]);

  constructor(
    private service: ClienteService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.cliente.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void {
    this.service.findById(this.cliente.id).subscribe(resposta => {
      this.cliente = resposta;
      this.cliente.senha = ''; // Limpa senha para não obrigar redigitar
    });
  }

  update(): void {
    // Objeto limpo e tipado corretamente para evitar erro 400/JSON
    const payload = {
      id: Number(this.cliente.id),
      nome: this.cliente.nome,
      cpf: this.cliente.cpf,
      email: this.cliente.email,
      senha: this.cliente.senha,
      perfis: this.cliente.perfis.map(p => Number(p)),
      // Sem dataCriacao
    };

    this.service.update(payload as Cliente).subscribe(resposta => {
      this.toast.success('Cliente atualizado com sucesso!', 'Atualização');
      this.router.navigate(['clientes']);
    }, ex => {
      if(ex.error.errors) {
        ex.error.errors.forEach((element: any) => {
          this.toast.error(element.message);
        });
      } else {
        this.toast.error(ex.error.message);
      }
    });
  }

  validaCampos(): boolean {
    return this.nome.valid && this.cpf.valid && this.email.valid && this.senha.valid;
  }

  addPerfil(perfil: any): void {
    const perfilNumero = Number(perfil);
    if(this.cliente.perfis.includes(perfilNumero)) {
      this.cliente.perfis.splice(this.cliente.perfis.indexOf(perfilNumero), 1);
    } else {
      this.cliente.perfis.push(perfilNumero);
    }
  }
}