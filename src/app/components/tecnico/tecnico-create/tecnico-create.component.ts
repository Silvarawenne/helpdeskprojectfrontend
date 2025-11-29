import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnico-create',
  templateUrl: './tecnico-create.component.html',
  styleUrls: ['./tecnico-create.component.css']
})
export class TecnicoCreateComponent implements OnInit {

  tecnico: Tecnico = {
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
    private service: TecnicoService,
    private toast: ToastrService,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
  }

  validaCampos(): boolean {
    return this.nome.valid && this.cpf.valid && this.email.valid && this.senha.valid;
  }

  create(): void {
    // Adicionar aqui a validação de perfis que sugeri na última conversa
    
    this.service.create(this.tecnico).subscribe(resposta => {
      this.toast.success('Técnico cadastrado com sucesso!', 'Cadastro');
      
      // 1. Navega para a lista
      this.router.navigate(['/tecnicos']).then(() => {
          // 2. Após a navegação, força o reload da página.
          // Isso garante que o ngOnInit do TecnicoListComponent rode novamente.
          window.location.reload(); 
      }); 

    }, ex => {
      // ... seu código de tratamento de erro (ex) permanece o mesmo
      // ...
    }); 
  }

  addPerfil(perfil: any): void {
    if(this.tecnico.perfis.includes(perfil)) {
      this.tecnico.perfis.splice(this.tecnico.perfis.indexOf(perfil), 1);
    } else {
      this.tecnico.perfis.push(perfil);
    }
  }

}