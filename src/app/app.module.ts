// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';

// Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { TecnicoListComponent } from './components/tecnico/tecnico-list/tecnico-list.component';
import { AuthInterceptor, AuthInterceptorProvider } from './interceptors/auth.interceptor';
import { TecnicoCreateComponent } from './components/tecnico/tecnico-create/tecnico-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TecnicoUpdateComponent } from './components/tecnico/tecnico-update/tecnico-update.component';
import { TecnicoDeleteComponent } from './components/tecnico/tecnico-delete/tecnico-delete.component';
import { ClienteListComponent } from './components/cliente/cliente-list/cliente-list.component';
import { ClienteCreateComponent } from './components/cliente/cliente-create/cliente-create.component';
import { ClienteUpdateComponent } from './components/cliente/cliente-update/cliente-update.component';
import { ClienteDeleteComponent } from './components/cliente/cliente-delete/cliente-delete.component';
import { ChamadoListComponent } from './components/chamado/chamado-list/chamado-list.component';
import { ChamadoCreateComponent } from './components/chamado/chamado-create/chamado-create.component';
import { ChamadoUpdateComponent } from './components/chamado/chamado-update/chamado-update.component';
import { ChamadoReadComponent } from './components/chamado/chamado-read/chamado-read.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavComponent,
    HomeComponent,
    HeaderComponent,
    TecnicoListComponent,
    TecnicoCreateComponent,
    TecnicoUpdateComponent,
    TecnicoDeleteComponent,
    ClienteListComponent,
    ClienteCreateComponent,
    ClienteUpdateComponent,
    ClienteDeleteComponent,
    ChamadoListComponent,
    ChamadoCreateComponent,
    ChamadoUpdateComponent,
    ChamadoReadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ToastrModule.forRoot({
      timeOut: 4000,
      closeButton: true,
      progressBar: true,
      positionClass: 'tost-top-right',
      preventDuplicates: true,
    }),
    HttpClientModule
  ],
  providers: [
    AuthInterceptorProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }