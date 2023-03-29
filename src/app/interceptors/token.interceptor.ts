import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { TokenService } from './../services/token.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private tokenService: TokenService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = this.addToken(request);
    return next.handle(request);
  }
  // Método para agregar token antes de que salga la petición
  private addToken(request: HttpRequest<unknown>) {
    const token = this.tokenService.getToken();
    // Si exiete un token, ya está logeado el usuario
    // Así que se envía junto con la petición, para saber que el
    // usuario está logeado
    if (token) {
      const authRequest = request.clone(
        {
          headers: request.headers.set('Authorization', `Bearer ${token}`)
        }
      );
      return authRequest;
    }
    // Si no está logeado, se envía el mismo request
    return request;
  }

}
