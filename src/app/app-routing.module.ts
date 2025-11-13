import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { AuthGuard } from './services/auth.guard';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { TecnicoListComponent } from './components/tecnico/tecnico-list/tecnico-list.component';
import { ClienteListComponent } from './components/cliente/cliente-list/cliente-list.component';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: NavComponent,
    canActivate: [AuthGuard],
    children: [
      {path: 'home', component: HomeComponent },
      {path: 'tecnicos', component: TecnicoListComponent},
      {path: 'clientes', component: ClienteListComponent},
      {path: '', redirectTo: 'home', pathMatch: 'full'}
    ]
  }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
