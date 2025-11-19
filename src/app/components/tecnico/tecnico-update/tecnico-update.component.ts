import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnico-update',
  templateUrl: './tecnico-update.component.html',
  styleUrls: ['./tecnico-update.component.css']
})
export class TecnicoUpdateComponent implements OnInit {

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
    private route: ActivatedRoute // Injeção para pegar o ID da URL
  ) { }

  ngOnInit(): void {
    // Assim que a tela carrega, pega o ID e busca os dados
    this.tecnico.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void {
    this.service.findById(this.tecnico.id).subscribe(resposta => {
      this.tecnico = resposta;
      // O perfil vem do banco como número/enum, precisamos ajustar se necessário
      // Por enquanto, vamos deixar ele carregar os dados principais
      this.tecnico.senha = ''; // Limpa a senha para o usuário digitar uma nova se quiser (opcional)
    });
  }

  update(): void {
    // Montando o objeto LIMPO
    const payload = {
      id: Number(this.tecnico.id),
      nome: this.tecnico.nome,
      cpf: this.tecnico.cpf,
      email: this.tecnico.email,
      senha: this.tecnico.senha,
      perfis: this.tecnico.perfis.map(p => Number(p)), // Garante números nos perfis
      // dataCriacao: this.tecnico.dataCriacao  <-- REMOVIDO PROPOSITALMENTE
    };

    console.log("Payload final enviado:", payload); // Debug

    this.service.update(payload as Tecnico).subscribe(resposta => {
      this.toast.success('Técnico atualizado com sucesso!', 'Atualização');
      this.router.navigate(['tecnicos']);
    }, ex => {
      // Vamos ver o erro detalhado
      console.error("Erro detalhado:", ex); 
      
      if(ex.error.errors) {
        ex.error.errors.forEach((element: any) => {
          this.toast.error(element.message);
        });
      } else {
        this.toast.error(ex.error.message || "Erro desconhecido no servidor");
      }
    });
  }

  addPerfil(perfil: any): void {
    // Garante que o valor que veio do checkbox (0 ou 1) seja tratado como Número
    const perfilNumero = Number(perfil);

    if(this.tecnico.perfis.includes(perfilNumero)) {
      // Se já tem esse número na lista, remove
      this.tecnico.perfis.splice(this.tecnico.perfis.indexOf(perfilNumero), 1);
    } else {
      // Se não tem, adiciona como NÚMERO
      this.tecnico.perfis.push(perfilNumero);
    }
  }

  validaCampos(): boolean {
    return this.nome.valid && this.cpf.valid && this.email.valid && this.senha.valid;
  }
}