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

  /** Solicita al servidor todos los clientes */
  getAllClients = (): Observable<ClientsResponse> =>
    this.httpClient.get<ClientsResponse>(`${this.url}/get_all`)

  /**
   * Solicita al servidor un cliente dado su ID
   * @param id ID del cliente
   * @returns Objeto con la información del cliente
  */
  getClient = (id: number): Observable<ClientResponse> =>
    this.httpClient.get<ClientResponse>(`${this.url}/get/${id}`)

  /**
   * Solicita al servidor que cree un nuevo cliente
   * @param client Objeto con la información del cliente
   * @returns Objeto con respuesta del servidor
  */
  createClient = (client: any): Observable<ServerResponse> => {
    client.id = client.id.toString()
    client.telefonos.forEach((telefono: string) => telefono.toString())

    return this.httpClient.post<ServerResponse>(`${this.url}/add`, client)
  }

  /**
   * Solicita al servidor que actualice un cliente
   * @param clientID ID del cliente
   * @param client Objeto con la información del cliente
   * @returns Objeto con respuesta del servidor
  */
  updateClient = (clientID: number, client: any): Observable<ServerResponse> => {
    client.id = client.id.toString()

    client.telefonos.forEach(
      (telefono: string) => telefono.toString()
    )

    return this.httpClient.patch<ServerResponse>(`${this.url}/update/${clientID}`, client)
  }

  /**
   * Solicita al servidor que elimine un cliente
   * @param clientID ID del cliente
   * @returns Objeto con respuesta del servidor
  */
  deleteClient = (id: number): Observable<ServerResponse> => {
    return this.httpClient.delete<ServerResponse>(`${this.url}/delete/${id}`)
  }
}
