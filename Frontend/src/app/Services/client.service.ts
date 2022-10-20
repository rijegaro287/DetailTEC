import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'

import { Client } from '../Interfaces/Client'
import {
  ServerResponse,
  ClientsResponse,
  ClientResponse
} from '../Interfaces/ServerResponses'

import { CLIENTS } from '../TestDB/Clients'

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  constructor() { }

  getAllClients = (): Observable<ClientsResponse> => {
    const okResponse: ClientsResponse = {
      status: 'ok',
      clients: CLIENTS
    }

    const errorResponse: ServerResponse = {
      status: 'error',
      message: 'No se pudieron obtener los clientes'
    }

    return of(okResponse)
  }

  getClient = (id: number): Observable<ClientResponse> => {
    const client: Client = CLIENTS.find(client => client.id === id)!

    const okResponse: ClientResponse = {
      status: 'ok',
      client: client
    }

    const errorResponse: ServerResponse = {
      status: 'error',
      message: 'No se pudo obtener el cliente'
    }

    return of(okResponse)
  }
}
