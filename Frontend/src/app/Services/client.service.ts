import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AllClientsResponse, ServerResponse } from '../Interfaces/ServerResponses';
import { CLIENTS } from '../TestDB/Clients';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor() { }

  getAllClients = ():Observable<AllClientsResponse> => {
    const okResponse: AllClientsResponse = {
      status: 'ok',
      clients: CLIENTS
    }

    const errorResponse: ServerResponse = {
      status: 'error',
      message: 'No se pudieron obtener los clientes'
    }

    return of(okResponse)
  }
}
