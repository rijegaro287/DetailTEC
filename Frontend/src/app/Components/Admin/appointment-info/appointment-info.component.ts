import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Appointment } from 'src/app/Interfaces/Appointment';
import { KeyReplacement } from 'src/app/Interfaces/Auxiliaries';

import { AppointmentsService } from 'src/app/Services/appointments.service';
import { AuxFunctionsService } from 'src/app/Services/aux-functions.service';
import { MessageService } from 'src/app/Services/message.service';

@Component({
  selector: 'app-appointment-info',
  templateUrl: './appointment-info.component.html',
  styleUrls: ['./appointment-info.component.scss']
})
export class AdminAppointmentInfoComponent implements OnInit {
  appointmentInfoTitles: KeyReplacement<Appointment>[]
  appointment: Appointment

  constructor(
    private route: ActivatedRoute,
    private appointmentService: AppointmentsService,
    protected auxFunctionsService: AuxFunctionsService,
    protected messageService: MessageService
  ) {
    this.appointmentInfoTitles = [
      { key: "id", replacement: "Número de cita" },
      { key: "nombreCliente", replacement: "Nombre del cliente" },
      { key: "cedulaCliente", replacement: "Cédula del cliente" },
      { key: "placaVehiculo", replacement: "Placa del vehículo" },
      { key: "nombreSucursal", replacement: "Sucursal" },
      { key: "nombreLavado", replacement: "Servicio solicitado" },
      { key: "fecha", replacement: "Fecha" },
      { key: "hora", replacement: "Hora" },
      { key: "montoPagado", replacement: "Monto a pagar" },
      { key: "medioPago", replacement: "Medio de pago" },
      { key: "nombresEmpleados", replacement: "Empleados asignados" }
    ]

    this.appointment = {} as Appointment
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'))
    this.appointmentService.getAppointment(id)
      .subscribe(response => {
        if (response.status === 'error') {
          this.messageService.setMessageInfo(response.message!, 'error')
        }
        else if (response.appointment) {
          this.appointment = response.appointment

          this.appointment.fecha = this.appointment.fecha.split('T')[0]
          this.appointment.hora = `${this.appointment.hora.split(':')[0]}:${this.appointment.hora.split(':')[1]}`
        }
        else {
          console.log(response)
        }
      })
  }

  generateBill = () => {
    this.appointmentService.generateBill(this.appointment.id)
      .subscribe(response => {
        if (response.status === 'error') {
          this.messageService.setMessageInfo(response.message!, 'error')
        }
        else {
          window.location.href = '/admin/bills'
        }
      })
  }

  deleteAppointment = () => {
    this.appointmentService.deleteAppointment(this.appointment.id)
      .subscribe(response => {
        if (response.status === 'error') {
          this.messageService.setMessageInfo(response.message!, 'error')
        }
        else {
          window.location.href = '/admin/appointments'
        }
      })
  }
}
