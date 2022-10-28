import { Component, OnInit } from '@angular/core'

import { LoginService } from 'src/app/Services/login.service'
import { MessageService } from 'src/app/Services/message.service'
import { BillService } from 'src/app/Services/bill.service'

import { Bill } from 'src/app/Interfaces/Bill'
import { KeyReplacement } from 'src/app/Interfaces/Auxiliaries'

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.sass']
})
export class ClientBillsComponent implements OnInit {
  tableColumns: KeyReplacement<Bill>[]
  tableData: Bill[]
  clientID: number

  constructor(
    private loginService: LoginService,
    private billService: BillService,
    protected messageService: MessageService
  ) {
    this.tableColumns = [
      { key: "nombreSucursal", replacement: "Sucursal" },
      { key: "tipoLavado", replacement: "Servicio brindado" },
      { key: "fecha", replacement: "Fecha" },
      { key: "hora", replacement: "Hora" },
      { key: "montoPagado", replacement: "Monto pagado" },
      { key: "puntosUtilizados", replacement: "Puntos utilizados" }
    ]

    this.tableData = []
    this.clientID = 0
  }


  ngOnInit(): void {
    this.messageService.resetMessageInfo()
    this.clientID = this.loginService.getLoggedClientID()

    // this.billService.getClientBills(this.clientID)
    //   .subscribe(response => {
    //     if (response.status === 'error') {
    //       this.messageService.setMessageInfo(response.message!, 'error')
    //     }
    //     else if (response.bills) {
    //       this.tableData = response.bills
    //     }
    //     else {
    //       console.log(response)
    //     }
    //   })
  }
}
