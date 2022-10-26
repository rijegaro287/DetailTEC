import { Component, OnInit } from '@angular/core'

import { Client } from 'src/app/Interfaces/Client'
import { KeyReplacement } from 'src/app/Interfaces/Auxiliaries'

import { MessageService } from 'src/app/Services/message.service'
import { ClientService } from 'src/app/Services/client.service'

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class AdminClientsComponent implements OnInit {
  tableColumns: KeyReplacement<Client>[]
  tableData: Client[]

  constructor(
    private clientService: ClientService,
    protected messageService: MessageService
  ) {
    this.tableColumns = [
      { key: "nombre", replacement: "Nombre" },
      { key: "apellido1", replacement: "Primer apellido" },
      { key: "apellido2", replacement: "Segundo apellido" },
      { key: "id", replacement: "Cédula" },
      { key: "email", replacement: "Correo" },
      { key: "actuales", replacement: "Puntos disponibles" },
    ]

    this.tableData = []
  }

  ngOnInit(): void {
    this.messageService.resetMessageInfo()

    this.clientService.getAllClients()
      .subscribe(response => {
        if (response.status === 'error') {
          this.messageService.setMessageInfo(response.message!, 'error')
        }
        else if (response.clients) {
          this.tableData = response.clients
        }
        else {
          console.log(response)
        }
      })
  }

}
