// src/app/components/login/login.component.ts

import { Component, OnInit } from '@angular/core';
import { Credenciais } from 'src/app/models/credenciais';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // Variável que liga com o HTML via ngModel
  creds: Credenciais = {
    email: '',
    senha: ''
  }

  // Injeta os serviços
  constructor(
    private toast: ToastrService,
    private service: AuthService
    ) { }

  ngOnInit(): void {
  }

  // Função chamada pelo botão de login
  logar() {
    // ---- SIMULAÇÃO DE LOGIN ----
    // Como ainda não temos o backend, vamos simular:
    // Usuário: admin@admin.com | Senha: 123
    
    if(this.creds.email === 'admin@admin.com' && this.creds.senha === '123') {
      // Chama o serviço para salvar o token e navegar
      this.service.successfulLogin('Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ...'); // Token de exemplo
      this.toast.success('Login efetuado com sucesso!', 'Login');
    } else {
      this.toast.error('Usuário ou senha inválidos!', 'Erro');
      this.creds.senha = ''; // Limpa o campo de senha
    }

  }

}