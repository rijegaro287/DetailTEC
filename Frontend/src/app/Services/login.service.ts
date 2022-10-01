import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs'

import { LoginForm } from '../Interfaces/LoginForm';
import { ServerResponse } from '../Interfaces/ServerResponse';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor() { }

  postLogin = (loginInfo: LoginForm): Observable<ServerResponse> => {
    console.log(loginInfo)
    const okResponse: ServerResponse = {
      status: 'ok'
    }

    const errorResponse: ServerResponse = {
      status: 'error',
      body: 'No se pudo iniciar sesión'
    }

    return of(okResponse)
  }
}
