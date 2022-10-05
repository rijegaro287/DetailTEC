import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'

import { LoginForm } from '../Interfaces/Forms'
import { ServerResponse } from '../Interfaces/ServerResponses'

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
      message: 'No se pudo iniciar sesión'
    }

    return of(errorResponse)
  }
}
