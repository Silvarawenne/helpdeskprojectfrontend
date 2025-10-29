// src/app/login.component.ts
// (ou src/app/components/login/login.component.ts, dependendo de onde você o criou)

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html', // <--- MUDANÇA AQUI
  styleUrls: ['./login.component.css']   // <--- MUDANÇA AQUI
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}