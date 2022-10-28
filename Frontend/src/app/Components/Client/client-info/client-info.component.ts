import { Component, OnInit } from '@angular/core'
import { Location } from '@angular/common';

import { KeyReplacement } from 'src/app/Interfaces/Auxiliaries'
import { Client } from 'src/app/Interfaces/Client'

import { ClientService } from 'src/app/Services/client.service'
import { MessageService } from 'src/app/Services/message.service'

@Component({
  selector: 'app-client-info',
  templateUrl: './client-info.component.html',
  styleUrls: ['./client-info.component.scss']
})
export class ClientInfoComponent implements OnInit {
  clientInfoTitles: KeyReplacement<Client>[]
  client: Client

  constructor(
    private location: Location,
    private clientService: ClientService,
    protected messageService: MessageService
  ) {
    this.clientInfoTitles = [
      { key: "id", replacement: "Cédula" },
      { key: "nombre", replacement: "Nombre" },
      { key: "apellido1", replacement: "Primer apellido" },
      { key: "apellido1", replacement: "Segundo apellido" },
      { key: "email", replacement: "Correo" },
      { key: "telefonos", replacement: "Telefonos" },
      { key: "direcciones", "replacement": "Direcciones" },
      { key: "actuales", replacement: "Puntos disponibles" }
    ]

    this.client = {} as Client
  }

  async ngOnInit(): Promise<void> {
    const state = this.location.getState() as any
    const clientID = state.clientID

    await this.getClient(clientID)
      .then((client) => { this.client = client })
  }

  getClient = (clientID: number): Promise<Client> => {
    return new Promise((resolve, reject) => {
      this.clientService.getClient(clientID)
        .subscribe(response => {
          if (response.status === 'error') {
            this.messageService.setMessageInfo(response.message!, 'error')
          }
          else if (response.client) {
            resolve(response.client)
          }
          else {
            console.log(response)
          }
        })
    })
  }
}