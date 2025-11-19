// src/app/material.module.ts
import { NgModule } from '@angular/core';

// Imports dos Módulos do Angular Material que já usamos e vamos usar
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog'; // Para pop-ups
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator'; // Para tabelas
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table'; // Para tabelas
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatBadgeModule } from '@angular/material/badge'; 
import { MatCheckboxModule } from '@angular/material/checkbox'; 
import { MatSelectModule } from '@angular/material/select';     
import { MatRadioModule } from '@angular/material/radio';


@NgModule({
  exports: [ 
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatTableModule,
    MatToolbarModule,
    MatBadgeModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule
  ]
})
export class MaterialModule { }