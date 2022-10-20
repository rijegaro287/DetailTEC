import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'

import { Appointment } from '../Interfaces/Appointment'
import {
  ServerResponse,
  AppointmentsResponse,
  AppointmentResponse
} from '../Interfaces/ServerResponses'

import { APPOINTMENTS } from '../TestDB/Appointments'


@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

  constructor() { }

  getAllAppointments = ():
    Observable<AppointmentsResponse> => {
    const okResponse: AppointmentsResponse = {
      status: 'ok',
      appointments: APPOINTMENTS
    }

    const errorResponse: ServerResponse = {
      status: 'error',
      message: 'No se pudieron obtener las facturas'
    }

    return of(okResponse)
  }

  getAppointment = (id: number):
    Observable<AppointmentResponse> => {
    const appointment: Appointment = APPOINTMENTS.find(appointment => appointment.id === id)!

    const okResponse: AppointmentResponse = {
      status: 'ok',
      appointment: appointment
    }

    const errorResponse: ServerResponse = {
      status: 'error',
      message: 'No se pudo obtener la factura'
    }

    return of(okResponse)
  }

  getClientAppointments = (clientID: number):
    Observable<AppointmentsResponse> => {
    const appointments: Appointment[] = APPOINTMENTS.filter(appointment => appointment.idCliente === clientID)!

    const okResponse: AppointmentsResponse = {
      status: 'ok',
      appointments: appointments
    }

    const errorResponse: ServerResponse = {
      status: 'error',
      message: 'No se pudo obtener la factura'
    }

    return of(okResponse)
  }
}