import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(">>> INTERCEPTOR CHAMADO!"); // Log para teste
    
    let token = localStorage.getItem('token');

    if (token) {
      console.log(">>> TOKEN ENCONTRADO, ANEXANDO..."); // Log para teste
      const cloneReq = request.clone({ headers: request.headers.set('Authorization', `Bearer ${token}`) });
      return next.handle(cloneReq);
    } else {
      console.log(">>> NENHUM TOKEN ENCONTRADO."); // Log para teste
      return next.handle(request);
    }
  }
}

export const AuthInterceptorProvider = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }
];