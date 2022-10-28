import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  ServerResponse
} from '../Interfaces/ServerResponses'

import { apiURL } from '../app.component'

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  url: string = `${apiURL}/reportes`

  constructor(
    private httpClient: HttpClient
  ) { }

  /** 
   * Solicita al servidor que genere la factura de una cita dada
   * @param appointmentID ID de la cita
  */
  getBillReport = (appointmentID: number): Observable<ServerResponse> =>
    this.httpClient.get<ServerResponse>(`${this.url}/facturacion/${appointmentID}`)

  /** 
   * Solicita al servidor que genere un reporte de todos los lavados
   * que ha solicitado un cliente
   * @param clientID ID del cliente
  */
  getWashesReport = (clientID: number): Observable<ServerResponse> =>
    this.httpClient.get<ServerResponse>(`${this.url}/lavados/${clientID}`)

  /** Solicita al servidor que genere un reporte con todos los puntos redimidos */
  getPointsReport = (): Observable<ServerResponse> =>
    this.httpClient.get<ServerResponse>(`${this.url}/puntos`)

  /** Solicita al servidor que genere la planilla de todos los empleados */
  getPayrollReport = (): Observable<ServerResponse> =>
    this.httpClient.get<ServerResponse>(`${this.url}/planilla`)
}
