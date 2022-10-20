import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { Appointment } from 'src/app/Interfaces/Appointment'
import { KeyReplacement } from 'src/app/Interfaces/Auxiliaries'

import { AppointmentsService } from 'src/app/Services/appointments.service'
import { MessageService } from 'src/app/Services/message.service'

@Component({
  selector: 'app-appointment-info',
  templateUrl: './appointment-info.component.html',
  styleUrls: ['./appointment-info.component.scss']
})
export class ClientAppointmentInfoComponent implements OnInit {
  appointmentInfoTitles: KeyReplacement<Appointment>[]
  appointment: Appointment

  constructor(
    private route: ActivatedRoute,
    private appointmentService: AppointmentsService,
    protected messageService: MessageService
  ) {
    this.appointmentInfoTitles = [
      { key: "id", replacement: "Número de cita" },
      { key: "placaVehiculo", replacement: "Placa del vehículo" },
      { key: "nombreSucursal", replacement: "Sucursal" },
      { key: "tipoLavado", replacement: "Servicio solicitado" },
      { key: "fecha", replacement: "Fecha" },
      { key: "hora", replacement: "Hora" }
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
        }
        else {
          console.log(response)
        }
      })
  }
}
