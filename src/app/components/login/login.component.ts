import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  // MUDANÇA 1: Usamos templateUrl para apontar para o arquivo HTML
  templateUrl: './login.component.html',
  // MUDANÇA 2: Usamos styleUrls para apontar para o arquivo CSS
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}