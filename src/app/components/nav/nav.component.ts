import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.router.navigate(['home']); // Garante que vai pra home ao carregar o menu
  }

  logout() {
    this.authService.logout(); // Limpa o token no service
    this.toast.info('Logout realizado com sucesso', 'Logout', { timeOut: 7000 });
    this.router.navigate(['login']);
  }
}