import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

import {
  ServerResponse,
  AppointmentsResponse,
  AppointmentResponse
} from '../Interfaces/ServerResponses'

import { apiURL } from '../app.component'
import { AuxFunctionsService } from './aux-functions.service'
import { Appointment } from '../Interfaces/Appointment'

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {
  url = `${apiURL}/cita`

  constructor(
    private auxFunctionsService: AuxFunctionsService,
    private httpClient: HttpClient
  ) { }

  getAllAppointments = (): Observable<AppointmentsResponse> =>
    this.httpClient.get<AppointmentsResponse>(`${this.url}/get_all`)

  getAppointment = (id: number): Observable<AppointmentResponse> =>
    this.httpClient.get<AppointmentResponse>(`${this.url}/get/${id}`)

  createAppointment = (appointment: any): Observable<ServerResponse> => {
    appointment.id = appointment.id.toString()
    appointment.cedulaCliente = appointment.cedulaCliente.toString()
    appointment.idSucursal = Number(appointment.idSucursal)
    appointment.tipoLavado = Number(appointment.tipoLavado)

    appointment.fecha = this.auxFunctionsService
      .dateToString(appointment.fecha)

    appointment.hora = this.auxFunctionsService
      .timeToString(appointment.hora)

    return this.httpClient.post<ServerResponse>(`${this.url}/add`, appointment)
  }

  updateAppointment = (appointmentID: number, appointment: any): Observable<ServerResponse> => {
    appointment.id = appointment.id.toString()
    appointment.cedulaCliente = appointment.cedulaCliente.toString()
    appointment.idSucursal = Number(appointment.idSucursal)
    appointment.tipoLavado = Number(appointment.tipoLavado)

    appointment.fecha = this.auxFunctionsService
      .dateToString(appointment.fecha)

    appointment.hora = this.auxFunctionsService
      .timeToString(appointment.hora)

    return this.httpClient.patch<ServerResponse>(`${this.url}/update/${appointmentID}`, appointment)
  }

  deleteAppointment = (id: number): Observable<ServerResponse> =>
    this.httpClient.delete<ServerResponse>(`${this.url}/delete/${id}`)

  generateBill = (id: number): Observable<ServerResponse> =>
    this.httpClient.get<ServerResponse>(`${this.url}/generar/${id}`)


  getClientAppointments = (id: number): Promise<Appointment[]> => {
    return new Promise<Appointment[]>((resolve, reject) => {
      this.getAllAppointments()
        .subscribe(response => {
          console.log(response);

          if (response.status === 'error') {
            console.log(response.message)
          }
          else if (response.appointments) {
            const clientAppointments = response.appointments
              .filter((appointment) => appointment.cedulaCliente == id)

            clientAppointments.forEach((appointment) => {
              appointment.fecha = appointment.fecha.split('T')[0]
              appointment.hora =
                `${appointment.hora.split(':')[0]}:${appointment.hora.split(':')[1]}`
            })

            resolve(clientAppointments)
          }
          else {
            console.log(response)
          }
        })
    })
  }
}