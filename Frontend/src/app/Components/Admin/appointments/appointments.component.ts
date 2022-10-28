import { Component, OnInit } from '@angular/core';

import { Appointment } from 'src/app/Interfaces/Appointment';
import { KeyReplacement } from 'src/app/Interfaces/Auxiliaries';

import { AppointmentsService } from 'src/app/Services/appointments.service';
import { MessageService } from 'src/app/Services/message.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AdminAppointmentsComponent implements OnInit {
  tableColumns: KeyReplacement<Appointment>[]
  tableData: Appointment[]

  constructor(
    private appointmentService: AppointmentsService,
    protected messageService: MessageService
  ) {
    this.tableColumns = [
      { key: "cedulaCliente", replacement: "Cédula del cliente" },
      { key: "placaVehiculo", replacement: "Placa del vehículo" },
      { key: "nombreSucursal", replacement: "Sucursal" },
      { key: "nombreLavado", replacement: "Servicio" },
      { key: "fecha", replacement: "Fecha" },
      { key: "hora", replacement: "Hora" },
      { key: "montoPagado", replacement: "Monto" }
    ]

    this.tableData = []
  }

  ngOnInit(): void {
    this.appointmentService.getAllAppointments()
      .subscribe(response => {
        if (response.status === 'error') {
          this.messageService.setMessageInfo(response.message!, 'error')
        }
        else if (response.appointments) {
          response.appointments.forEach((appointment) => {
            appointment.fecha = appointment.fecha.split('T')[0]
            appointment.hora =
              `${appointment.hora.split(':')[0]}:${appointment.hora.split(':')[1]}`
          })

          this.tableData = response.appointments
        }
        else {
          console.log(response)
        }
      })
  }
}
