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

  postLogin = (loginInfo: LoginForm): Observable<LoginResponse> =>
    this.httpClient.post<LoginResponse>(`${this.url}/verify`, loginInfo)

  logout = () => {
    this.loggedIn = false
    this.loggedClientID = 0
    window.location.href = '/login'
  }

  getLoggedClientID = () => this.loggedClientID

  setLoggedClientID = (clientID: number) => {
    if (!this.loggedIn) {
      this.loggedClientID = clientID
      this.loggedIn = true
    }
  }
}
