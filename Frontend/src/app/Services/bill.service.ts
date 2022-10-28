import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

import {
  AppointmentsResponse
} from '../Interfaces/ServerResponses'

import { apiURL } from '../app.component'

import { AuxFunctionsService } from './aux-functions.service'
import { Appointment } from '../Interfaces/Appointment'

@Injectable({
  providedIn: 'root'
})
export class BillService {
  url = `${apiURL}/cita`

  constructor(
    private auxFunctionsService: AuxFunctionsService,
    private httpClient: HttpClient
  ) { }

  /**
   * Solicita al servidor que devuelva todas las facturas
  */
  getAllBills = (): Observable<AppointmentsResponse> =>
    this.httpClient.get<AppointmentsResponse>(`${this.url}/facturas`)

  /**
   * Solicita al servidor que devuelva la información de una factura
   * @param id de la cita
   * @returns Objeto con respuesta del servidor
  */
  getClientBills = (id: number): Promise<Appointment[]> => {
    return new Promise<Appointment[]>((resolve, reject) => {
      this.getAllBills()
        .subscribe(response => {
          console.log(response);

          if (response.status === 'error') {
            console.log(response.message)
          }
          else if (response.appointments) {
            const clientBills = response.appointments
              .filter((appointment) => appointment.cedulaCliente == id)

            clientBills.forEach((appointment) => {
              appointment.fecha = appointment.fecha.split('T')[0]
              appointment.hora =
                `${appointment.hora.split(':')[0]}:${appointment.hora.split(':')[1]}`
            })

            resolve(clientBills)
          }
          else {
            console.log(response)
          }
        })
    })
  }
}
