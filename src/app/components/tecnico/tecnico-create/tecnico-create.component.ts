import { Component, OnInit } from '@angular/core';
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
  ) { }

  ngOnInit(): void {
  }

  validaCampos(): boolean {
    return this.nome.valid && this.cpf.valid && this.email.valid && this.senha.valid;
  }

  create(): void {
    // 1. Garante que o objeto técnico a ser enviado tenha pelo menos o perfil CLIENTE
    // Seu backend pode exigir isso, ou você deve garantir que o Admin está setado.
    if (this.tecnico.perfis.length === 0) {
        this.toast.error('O técnico deve ter pelo menos um Perfil (CLIENTE ou ADMIN).', 'Validação');
        return; 
    }
    
    this.service.create(this.tecnico).subscribe(resposta => {
      this.toast.success('Técnico cadastrado com sucesso!', 'Cadastro');
      
      // CORREÇÃO: Navegação absoluta para garantir que o componente de lista recarregue
      this.router.navigate(['/tecnicos']); 
      
    }, ex => {
      console.log(ex);
      if(ex.error.errors) {
        ex.error.errors.forEach((element: any) => {
          this.toast.error(element.message);
        });
      } else {
        // Agora que o 403 está resolvido, este erro será geralmente 400 Bad Request
        this.toast.error(ex.error.message);
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