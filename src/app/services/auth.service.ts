import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Auth } from '../models/auth.model';
import { User } from '../models/user.model';
import { TokenService } from './token.service';



//Para evitar callback hell con observables
import { switchMap, tap } from 'rxjs/operators';

// Para medir el tiempo
import { checkTime } from './../interceptors/time.interceptor';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://young-sands-07814.herokuapp.com/api/auth';
  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  login(email: string, password: string) {
    return this.http.post<Auth>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap(response => this.tokenService.saveToken(response.access_token))
      );
  }

  profile() {
    //Opción dinámica
    /* const headers = new HttpHeaders();
    headers.set('Authorization', `Bearer ${token}`); */
    return this.http.get<User>(`${this.apiUrl}/profile`, {
      /* headers:
      {
        //Opción no dinámica
        Authorization: `Bearer ${token}`,
        // content-type: application-json
      } */
      context: checkTime()
    });
  }

  loginAndGet(email: string, password: string) {
    return this.login(email, password)
      .pipe(
        switchMap(() => this.profile())
      );
  }
}
