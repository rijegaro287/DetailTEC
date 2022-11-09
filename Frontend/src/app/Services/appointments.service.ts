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

  /**
   * Solicita al servidor todas las citas que se encuentran en la base de datos
  */
  getAllAppointments = (): Observable<AppointmentsResponse> =>
    this.httpClient.get<AppointmentsResponse>(`${this.url}/get_all`)

  /**
   * Solicita al servidor la cita con el id especificado
   * @param id ID de la cita a buscar
   * @returns Objeto con la respuesta del servidor
  */
  getAppointment = (id: number): Observable<AppointmentResponse> =>
    this.httpClient.get<AppointmentResponse>(`${this.url}/get/${id}`)

  /**
   * Solicita al servidor que cree una nueva cita
   * @param appointment Objeto con los datos de la cita a crear
   * @returns Objeto con la respuesta del servidor
  */
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

  /**
   * Solicita al servidor que actualice los datos de la cita con el id especificado
   * @param appointmentID ID de la cita a actualizar
   * @param appointment Objeto con los datos de la cita a actualizar
   * @returns Objeto con la respuesta del servidor
  */
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

  /**
   * Solicita al servidor que elimine la cita con el id especificado
   * @param id ID de la cita a eliminar
   * @returns Objeto con la respuesta del servidor
  */
  deleteAppointment = (id: number): Observable<ServerResponse> =>
    this.httpClient.delete<ServerResponse>(`${this.url}/delete/${id}`)

  /**
   * Solicita al servidor que genere una factura para la cita con el id especificado
   * @param id ID de la cita a facturar
   * @returns Objeto con la respuesta del servidor
  */
  generateBill = (id: number): Observable<ServerResponse> =>
    this.httpClient.get<ServerResponse>(`${this.url}/generar/${id}`)

  /**
   * Solicita al servidor todas las citas de un cliente con la cédula especificada
   * @param id ID del cliente
   * @returns Todas las citas del cliente
  */
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