import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { apiURL } from '../app.component'

import { LoginForm } from '../Interfaces/Forms'
import { LoginResponse, ServerResponse } from '../Interfaces/ServerResponses'

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url: string = `${apiURL}/login`

  private loggedClientID = 0
  private loggedIn = false

  constructor(
    private httpClient: HttpClient
  ) { }

  /** 
   * Solicita al servidor que inicie sesión 
   * @param loginForm Objeto con el correo, la contraseña y el tipo de usuario
  */
  postLogin = (loginInfo: LoginForm): Observable<LoginResponse> =>
    this.httpClient.post<LoginResponse>(`${this.url}/verify`, loginInfo)
}
