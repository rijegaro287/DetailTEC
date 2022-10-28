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

  getBillReport = (appointmentID: number): Observable<ServerResponse> =>
    this.httpClient.get<ServerResponse>(`${this.url}/facturacion/${appointmentID}`)

  getWashesReport = (clienID: number): Observable<ServerResponse> =>
    this.httpClient.get<ServerResponse>(`${this.url}/lavados/${clienID}`)

  getPointsReport = (): Observable<ServerResponse> =>
    this.httpClient.get<ServerResponse>(`${this.url}/puntos`)

  getPayrollReport = (): Observable<ServerResponse> =>
    this.httpClient.get<ServerResponse>(`${this.url}/planilla`)
}
