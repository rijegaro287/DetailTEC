import { Component, OnInit } from '@angular/core'

import { KeyReplacement } from 'src/app/Interfaces/Auxiliaries'
import { Client } from 'src/app/Interfaces/Client'

import { ClientService } from 'src/app/Services/client.service'
import { LoginService } from 'src/app/Services/login.service'
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
    private loginService: LoginService,
    private clientService: ClientService,
    protected messageService: MessageService
  ) {
    this.clientInfoTitles = [
      { key: "id", replacement: "Cédula" },
      { key: "usuario", replacement: "Usuario" },
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

  ngOnInit(): void {
    const id = this.loginService.getLoggedClientID()
    // this.clientService.getClient(id)
    //   .subscribe(response => {
    //     if (response.status === 'error') {
    //       this.messageService.setMessageInfo(response.message!, 'error')
    //     }
    //     else if (response.client) {
    //       this.client = response.client
    //     }
    //     else {
    //       console.log(response)
    //     }
    //   })
  }
}
