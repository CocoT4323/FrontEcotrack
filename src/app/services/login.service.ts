import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtRequest } from '../models/jwtRequest';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private isBrowser: boolean = typeof window !== 'undefined';

  constructor(private http: HttpClient) {}
  login(request: JwtRequest) {
    return this.http.post('https://ecotrack-u36k.onrender.com/login', request);
  }
  verificar() {
    if (this.isBrowser) {
    let token = sessionStorage.getItem('token');
    return token != null;
  }
  return false;
  }
  showRole() {
    if (this.isBrowser) {
    let token = sessionStorage.getItem('token');
    if (!token) {
      // Manejar el caso en el que el token es nulo.
      return null; // O cualquier otro valor predeterminado dependiendo del contexto.
    }
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    return decodedToken?.role;
  }
  return false;
  }
  showUsername() {
    if (this.isBrowser) {
    let token = sessionStorage.getItem('token');
    if (!token) {
      // Manejar el caso en el que el token es nulo.
      return null; // O cualquier otro valor predeterminado dependiendo del contexto.
    }
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    return decodedToken?.sub;
  }
  return false;
  }
}
