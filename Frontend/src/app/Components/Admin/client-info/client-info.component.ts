import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { ClientService } from 'src/app/Services/client.service'
import { MessageService } from 'src/app/Services/message.service'

import { Client } from 'src/app/Interfaces/Client'
import { KeyReplacement } from 'src/app/Interfaces/Auxiliaries'
import { AuxFunctionsService } from 'src/app/Services/aux-functions.service'
import { ReportsService } from 'src/app/Services/reports.service'

@Component({
  selector: 'app-client-info',
  templateUrl: './client-info.component.html',
  styleUrls: ['./client-info.component.scss']
})
export class AdminClientInfoComponent implements OnInit {
  clientInfoTitles: KeyReplacement<Client>[]
  client: Client

  constructor(
    private route: ActivatedRoute,
    private clientService: ClientService,
    private reportsService: ReportsService,
    protected auxFunctionsService: AuxFunctionsService,
    protected messageService: MessageService
  ) {
    this.clientInfoTitles = [
      { key: "id", replacement: "Cédula" },
      { key: "nombre", replacement: "Nombre" },
      { key: "apellido1", replacement: "Primer apellido" },
      { key: "apellido2", replacement: "Segundo apellido" },
      { key: "email", replacement: "Correo" },
      { key: "telefonos", replacement: "Telefonos" },
      { key: "direcciones", "replacement": "Direcciones" },
      { key: "total", replacement: "Puntos totales" },
      { key: "utilizados", replacement: "Puntos redimidos" },
      { key: "actuales", replacement: "Puntos disponibles" }
    ]

    this.client = {} as Client
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'))
    this.clientService.getClient(id)
      .subscribe(response => {
        if (response.status === 'error') {
          this.messageService.setMessageInfo(response.message!, 'error')
        }
        else if (response.client) {
          this.client = response.client
        }
        else {
          console.log(response)
        }
      })
  }

  deleteClient = (): void => {
    this.clientService.deleteClient(this.client.id)
      .subscribe(response => {
        if (response.status === 'error') {
          this.messageService.setMessageInfo(response.message!, 'error')
        }
        else {
          window.location.href = '/admin/clients'
        }
      })
  }

  downloadWashes = (): void => {
    this.reportsService.getWashesReport(this.client.id)
      .subscribe(response => {
        // console.log(response)
        let fileName = response.headers.get('Content-Disposition')
        ?.split(';')[1].split('=')[1]
        let blob:Blob = response.body as Blob
        let a = document.createElement('a')
        a.href = window.URL.createObjectURL(blob)
        a.click()
      })
  }
}
