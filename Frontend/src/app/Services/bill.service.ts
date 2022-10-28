import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

import {
  AppointmentsResponse
} from '../Interfaces/ServerResponses'

import { apiURL } from '../app.component'

import { AuxFunctionsService } from './aux-functions.service'

@Injectable({
  providedIn: 'root'
})
export class BillService {
  url = `${apiURL}/cita`

  constructor(
    private auxFunctionsService: AuxFunctionsService,
    private httpClient: HttpClient
  ) { }

  getAllBills = (): Observable<AppointmentsResponse> =>
    this.httpClient.get<AppointmentsResponse>(`${this.url}/facturas`)
}
