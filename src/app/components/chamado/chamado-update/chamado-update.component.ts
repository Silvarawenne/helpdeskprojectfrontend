import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Chamado } from 'src/app/models/chamado';
import { Cliente } from 'src/app/models/clientes';
import { Tecnico } from 'src/app/models/tecnico';
import { ChamadoService } from 'src/app/services/chamado.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-chamado-update',
  templateUrl: './chamado-update.component.html',
  styleUrls: ['./chamado-update.component.css']
})
export class ChamadoUpdateComponent implements OnInit {

  chamado: Chamado = {
    prioridade: '',
    status: '',
    titulo: '',
    observacoes: '',
    tecnico: '',
    cliente: '',
    nomeCliente: '',
    nomeTecnico: '',
  }

  clientes: Cliente[] = [];
  tecnicos: Tecnico[] = [];

  prioridade: FormControl = new FormControl(null, [Validators.required]);
  status:     FormControl = new FormControl(null, [Validators.required]);
  titulo:     FormControl = new FormControl(null, [Validators.required]);
  observacoes:FormControl = new FormControl(null, [Validators.required]);
  tecnico:    FormControl = new FormControl(null, [Validators.required]);
  cliente:    FormControl = new FormControl(null, [Validators.required]);

  constructor(
    private chamadoService: ChamadoService,
    private clienteService: ClienteService,
    private tecnicoService: TecnicoService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.chamado.id = this.route.snapshot.paramMap.get('id');
    this.findById();
    this.findAllClientes();
    this.findAllTecnicos();
  }

  findById(): void {
    this.chamadoService.findById(this.chamado.id).subscribe(resposta => {
      this.chamado = resposta;
      
      // PREENCHE OS CAMPOS DO FORMULÁRIO COM OS DADOS QUE VIERAM DO BANCO
      this.titulo.setValue(this.chamado.titulo);
      this.observacoes.setValue(this.chamado.observacoes);
      this.prioridade.setValue(this.chamado.prioridade);
      this.status.setValue(this.chamado.status);
      this.tecnico.setValue(this.chamado.tecnico);
      this.cliente.setValue(this.chamado.cliente);
    }, ex => {
      this.toast.error(ex.error.error);
    })
  }

  update(): void {
    // Pegamos o ID que veio da rota (URL) para ter certeza que não é nulo
    const idDaUrl = this.route.snapshot.paramMap.get('id');

    const payload = {
      id:          Number(idDaUrl), // <--- FORÇA O ID DA URL AQUI
      titulo:      this.titulo.value,
      observacoes: this.observacoes.value,
      prioridade:  this.prioridade.value,
      status:      this.status.value,
      tecnico:     Number(this.tecnico.value),
      cliente:     Number(this.cliente.value),
      tecnicoId:   Number(this.tecnico.value),
      clienteId:   Number(this.cliente.value),
      nomeCliente: '',
      nomeTecnico: ''
    }

    console.log("PAYLOAD UPDATE:", payload); // Olhe o console! O 'id' deve ser um número (ex: 1)

    this.chamadoService.update(payload as any).subscribe(resposta => {
      this.toast.success('Chamado atualizado com sucesso', 'Atualizar Chamado');
      this.router.navigate(['chamados']);
    }, ex => {
      // ... tratamento de erro igual
      this.toast.error(ex.error.message);
    })
  }

  findAllClientes(): void {
    this.clienteService.findAll().subscribe(resposta => {
      this.clientes = resposta;
    })
  }

  findAllTecnicos(): void {
    this.tecnicoService.findAll().subscribe(resposta => {
      this.tecnicos = resposta;
    })
  }

  validaCampos(): boolean {
    return this.prioridade.valid && this.status.valid && this.titulo.valid 
       && this.observacoes.valid && this.tecnico.valid && this.cliente.valid;
  }
  
  // Funções para converter números em texto (para exibir status corretamente se precisar)
  retornaStatus(status: any): string {
    if(status == '0') return 'ABERTO';
    else if(status == '1') return 'EM ANDAMENTO';
    else return 'ENCERRADO';
  }

  retornaPrioridade(prioridade: any): string {
    if(prioridade == '0') return 'BAIXA';
    else if(prioridade == '1') return 'MÉDIA';
    else return 'ALTA';
  }
}