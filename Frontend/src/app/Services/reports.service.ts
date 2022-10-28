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

  // getBillReport = (appointmentID: number): Observable<ServerResponse> =>
  //   this.httpClient.get<ServerResponse>(`${this.url}/facturacion/${appointmentID}`)

  // getWashesReport = (clienID: number): Observable<ServerResponse> =>
  //   this.httpClient.get<ServerResponse>(`${this.url}/lavados/${clienID}`)

  // getPointsReport = (): Observable<ServerResponse> =>
  //   this.httpClient.get<ServerResponse>(`${this.url}/puntos`)

    // getPayrollReport = (): Observable<ServerResponse> =>
    // this.httpClient.get<ServerResponse>(`${this.url}/planilla`)
    // this.httpClient.post<ServerResponse>(`${this.url}/planilla`, {responseType: 'blob'})

    public getBillReport(appointmentID: number){
      return this.httpClient.get(`${this.url}/facturacion/${appointmentID}`, {observe: 'response', responseType: 'blob'})
    }

    public getWashesReport(clientID: number){
      return this.httpClient.get(`${this.url}/lavados/${clientID}`, {observe: 'response', responseType: 'blob'})
    }

    public getPointsReport(){
      return this.httpClient.get(`${this.url}/puntos`, {observe: 'response', responseType: 'blob'})
    }

    public getPayrollReport(){
      return this.httpClient.get(`${this.url}/planilla`, {observe: 'response', responseType: 'blob'})
    }
}
