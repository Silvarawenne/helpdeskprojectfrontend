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

  create(): void {
    
    // VERIFICAÇÃO 1: Garante que pelo menos um perfil foi selecionado
    if (this.tecnico.perfis.length === 0) {
        this.toast.error('O técnico deve ter pelo menos um Perfil (ADMIN ou TÉCNICO).', 'Validação');
        return; 
    }
    
    // CORREÇÃO FINAL DE DADOS: Remove a máscara do CPF antes de enviar para o Backend Java
    // Se você estiver usando uma biblioteca de máscara, esta linha é crucial.
    this.tecnico.cpf = this.tecnico.cpf.replace(/[^0-9]/g, ""); 
    
    this.service.create(this.tecnico).subscribe(resposta => {
      this.toast.success('Técnico cadastrado com sucesso!', 'Cadastro');
      
      // CORREÇÃO DE ATUALIZAÇÃO DA LISTA: Navegação absoluta seguida de reload
      this.router.navigate(['/tecnicos']).then(() => {
          window.location.reload(); 
      }); 

    }, ex => {
      // TRATAMENTO DE ERRO COMPLETO (Para expor o 400 Bad Request)
      console.error(ex);
      if(ex.error.errors) {
        // Erros de validação do Spring (@Size, @Email, etc.)
        ex.error.errors.forEach((element: any) => {
          this.toast.error(element.message);
        });
      } else if (ex.error.message) {
        // Erro de lógica de negócio (DataIntegrityViolation - CPF/Email duplicado)
        this.toast.error(ex.error.message);
      } else {
         // Erro genérico (ex: 403 Forbidden se algo falhou no filtro)
         this.toast.error('Ocorreu um erro inesperado no servidor. Tente novamente.');
      }
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