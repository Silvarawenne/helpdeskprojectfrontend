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

  creds: Credenciais = {
    email: '',
    senha: ''
  }

  constructor(
    private toast: ToastrService,
    private service: AuthService
    ) { }

  ngOnInit(): void {
  }

  logar() {
    this.service.authenticate(this.creds).subscribe(resposta => {
      let token = resposta.headers.get('Authorization');

      if(token){
        this.service.successfulLogin(token);
        this.toast.success('Login realizado com sucesso!', 'Login');
      }else{
        this.toast.error('Token não encontrado na resposta!', 'Erro');
      }

    }, error =>{
      console.error(error);
      this.toast.error('Usuário e/ou senha Inválidos', 'Erro');
      this.creds.senha = '';
    });
  }

}