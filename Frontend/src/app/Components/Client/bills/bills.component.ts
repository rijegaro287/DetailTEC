import { Component, OnInit } from '@angular/core'
import { Location } from '@angular/common';

import { MessageService } from 'src/app/Services/message.service'
import { BillService } from 'src/app/Services/bill.service'

import { Appointment } from 'src/app/Interfaces/Appointment'
import { KeyReplacement } from 'src/app/Interfaces/Auxiliaries'
import { ReportsService } from 'src/app/Services/reports.service';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.sass']
})
export class ClientBillsComponent implements OnInit {
  tableColumns: KeyReplacement<Appointment>[]
  tableData: Appointment[]

  constructor(
    private location: Location,
    private billService: BillService,
    private reportsService: ReportsService,
    protected messageService: MessageService
  ) {
    this.tableColumns = [
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
    this.messageService.resetMessageInfo()

    const state = this.location.getState() as any
    const clientID = state.clientID

    this.billService.getClientBills(clientID)
      .then((bills) => {
        this.tableData = bills
      })
  }

  downloadBill = (appointmentID: number): void => {
    this.reportsService.getBillReport(appointmentID)
      .subscribe(response => {
        // console.log(response);
        let fileName = response.headers.get('Content-Disposition')
        ?.split(';')[1].split('=')[1]
        let blob:Blob = response.body as Blob
        let a = document.createElement('a')
        a.href = window.URL.createObjectURL(blob)
        a.click()
      })
  }
}
