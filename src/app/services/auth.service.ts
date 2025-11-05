import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Credenciais } from '../models/credenciais';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl: string = environment.baseUrl;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  authenticate(creds: Credenciais){
    console.log('AuthService.authenticate() foi chamado!');
  }

  successfulLogin(token: string){
    let authToken = token.substring(7);
    localStorage.setItem('token', authToken);
    this.router.navigate(['home']);
  }

  isAuthenticate(): boolean{
    let token = localStorage.getItem('token');
    if(token != null){
      return true;
    }
    return false;
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
