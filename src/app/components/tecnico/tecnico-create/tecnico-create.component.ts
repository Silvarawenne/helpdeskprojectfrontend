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

  // INICIALIZAÇÃO CORRIGIDA PARA ENVIAR 'null' AO BACKEND
  tecnico: Tecnico = {
    id: null,
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    perfis: [],
    dataCriacao: null 
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

  // TecnicoCreateComponent.ts

// ... (todo o código acima permanece igual)

  create(): void {
    
    // ... (restante da lógica de validação)
    
    this.service.create(this.tecnico).subscribe(resposta => {
      // 1. TOAST DE SUCESSO (VAI APARECER AGORA)
      this.toast.success('Técnico cadastrado com sucesso!', 'Cadastro');
      
      // 2. NAVEGAÇÃO PURA (Sem forçar o reload imediato)
      this.router.navigate(['/tecnicos']); 

    }, ex => {
      // ... (código de tratamento de erro)
    }); 
  }
  
// ...

  addPerfil(perfil: any): void {
    if(this.tecnico.perfis.includes(perfil)) {
      this.tecnico.perfis.splice(this.tecnico.perfis.indexOf(perfil), 1);
    } else {
      this.tecnico.perfis.push(perfil);
    }
  }
}