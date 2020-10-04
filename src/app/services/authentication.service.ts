import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface loginData {
  email: string;
  password: string;
}

export interface registerData {
  name: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  authApiRoot: string = 'http://localhost:1234';

  constructor(private _http: HttpClient) { }

  loginService(data: loginData){
    const headers = { 'Content-Type': 'application/json'};
    const body = JSON.stringify(data);
    return this._http.post(this.authApiRoot + '/auth/signin', body, {'headers': headers});
  }

  registerService(data: registerData) {
    const headers = { 'Content-Type': 'application/json'};
    const body = JSON.stringify(data);
    return this._http.put(this.authApiRoot + '/auth/signup', body, {'headers': headers});
  }

  storeToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  removeToken() {
    localStorage.removeItem('token');
  }

  checkToken(){
    if (this.getToken()) {
      const payload = this.getPayloadFromToken(this.getToken());
      // console.log(payload);
      return payload.exp < payload.iat ? false : true;
    }
    return false;
  }

  getPayloadFromToken(token: string) {
    const payload = token.split('.')[1];
    return this.decodePayload(payload);
  }

  decodePayload(payload: string) {
    return JSON.parse(atob(payload));
  }

  isLoggedIn() {
    return this.checkToken();
  }
}
