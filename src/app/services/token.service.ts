import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }
  // Almacenar la sesión en local storage.
  // (También se puede almacenar en session storage y cookies)
  saveToken(token: string) {
    localStorage.setItem('token', token);
  }
  getToken() {
    const token = localStorage.getItem('token');
    return token;
  }
}
