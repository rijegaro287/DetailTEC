import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { apiURL } from '../app.component'

import { Client } from '../Interfaces/Client'
import {
  ServerResponse,
  ClientsResponse,
  ClientResponse
} from '../Interfaces/ServerResponses'

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  url: string = `${apiURL}/cliente`

  constructor(
    private httpClient: HttpClient
  ) { }

  getAllClients = (): Observable<ClientsResponse> =>
    this.httpClient.get<ClientsResponse>(`${this.url}/get_all`)

  getClient = (id: number): Observable<ClientResponse> =>
    this.httpClient.get<ClientResponse>(`${this.url}/get/${id}`)

  createClient = (client: any): Observable<ServerResponse> => {
    client.id = client.id.toString()
    client.telefonos.forEach((telefono: string) => telefono.toString())

    return this.httpClient.post<ServerResponse>(`${this.url}/add`, client)
  }

  updateClient = (clientID: number, client: any): Observable<ServerResponse> => {
    client.id = client.id.toString()
    client.telefonos.forEach((telefono: string) => telefono.toString())

    return this.httpClient.patch<ServerResponse>(`${this.url}/update/${clientID}`, client)
  }

  deleteClient = (id: number): Observable<ServerResponse> => {
    return this.httpClient.delete<ServerResponse>(`${this.url}/delete/${id}`)
  }
}
