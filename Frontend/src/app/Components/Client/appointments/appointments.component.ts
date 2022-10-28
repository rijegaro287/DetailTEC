import { Component, OnInit } from '@angular/core'
import { Location } from '@angular/common';

import { Appointment } from 'src/app/Interfaces/Appointment'
import { KeyReplacement } from 'src/app/Interfaces/Auxiliaries'

import { MessageService } from 'src/app/Services/message.service'
import { AppointmentsService } from 'src/app/Services/appointments.service'

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class ClientAppointmentsComponent implements OnInit {
  tableColumns: KeyReplacement<Appointment>[]
  tableData: Appointment[]

  constructor(
    private location: Location,
    private appointmentService: AppointmentsService,
    protected messageService: MessageService
  ) {
    this.tableColumns = [
      { key: "placaVehiculo", replacement: "Placa del vehículo" },
      { key: "nombreSucursal", replacement: "Sucursal" },
      { key: "tipoLavado", replacement: "Servicio" },
      { key: "fecha", replacement: "Fecha" },
      { key: "hora", replacement: "Hora" },
      { key: "montoPagado", replacement: "Monto" }
    ]

    this.tableData = []
  }

  ngOnInit(): void {
    const state = this.location.getState() as any
    const clientID = state.clientID

    this.messageService.resetMessageInfo()

    this.appointmentService.getClientAppointments(clientID)
      .then((appointments) => { this.tableData = appointments })
  }
}
