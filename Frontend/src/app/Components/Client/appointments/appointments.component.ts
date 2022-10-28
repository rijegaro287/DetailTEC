import { Component, OnInit } from '@angular/core'

import { Appointment } from 'src/app/Interfaces/Appointment'
import { KeyReplacement } from 'src/app/Interfaces/Auxiliaries'

import { MessageService } from 'src/app/Services/message.service'
import { AppointmentsService } from 'src/app/Services/appointments.service'
import { LoginService } from 'src/app/Services/login.service'

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class ClientAppointmentsComponent implements OnInit {
  tableColumns: KeyReplacement<Appointment>[]
  tableData: Appointment[]
  clientID: number

  constructor(
    private loginService: LoginService,
    private appointmentService: AppointmentsService,
    protected messageService: MessageService
  ) {
    this.tableColumns = [
      { key: "placaVehiculo", replacement: "Placa del vehículo" },
      { key: "nombreSucursal", replacement: "Sucursal" },
      { key: "tipoLavado", replacement: "Servicio solicitado" },
      { key: "fecha", replacement: "Fecha" },
      { key: "hora", replacement: "Hora" }
    ]

    this.tableData = []
    this.clientID = 0
  }

  ngOnInit(): void {
    this.clientID = this.loginService.getLoggedClientID()
    this.messageService.resetMessageInfo()

    // this.appointmentService.getClientAppointments(this.clientID)
    //   .subscribe(response => {
    //     if (response.status === 'error') {
    //       this.messageService.setMessageInfo(response.message!, 'error')
    //     }
    //     else if (response.appointments) {
    //       this.tableData = response.appointments
    //     }
    //     else {
    //       console.log(response)
    //     }
    //   })
  }
}
