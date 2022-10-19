import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { ClientService } from 'src/app/Services/client.service'
import { MessageService } from 'src/app/Services/message.service'

import { Client } from 'src/app/Interfaces/Client'
import { KeyReplacement } from 'src/app/Interfaces/Auxiliaries'

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
    protected messageService: MessageService
  ) {
    this.clientInfoTitles = [
      { key: "id", replacement: "Cédula" },
      { key: "usuario", replacement: "Usuario" },
      { key: "nombre", replacement: "Nombre" },
      { key: "apellido", replacement: "Apellido" },
      { key: "email", replacement: "Correo" },
      { key: "telefonos", replacement: "Telefonos" },
      { key: "direcciones", "replacement": "Direcciones" },
      { key: "puntos", replacement: "Puntos" }
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
}