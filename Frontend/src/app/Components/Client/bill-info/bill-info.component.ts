import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { KeyReplacement } from 'src/app/Interfaces/Auxiliaries'
import { Bill } from 'src/app/Interfaces/Bill'

import { BillService } from 'src/app/Services/bill.service'
import { FormsService } from 'src/app/Services/forms.service'
import { MessageService } from 'src/app/Services/message.service'

@Component({
  selector: 'app-bill-info',
  templateUrl: './bill-info.component.html',
  styleUrls: ['./bill-info.component.scss']
})
export class ClientBillInfoComponent implements OnInit {
  billInfoTitles: KeyReplacement<Bill>[]
  bill: Bill

  constructor(
    private route: ActivatedRoute,
    private billService: BillService,
    private formsService: FormsService,
    protected messageService: MessageService) {
    this.billInfoTitles = [
      { key: "placaVehiculo", replacement: "Placa del vehículo" },
      { key: "nombreSucursal", replacement: "Sucursal" },
      { key: "tipoLavado", replacement: "Servicio brindado" },
      { key: "fecha", replacement: "Fecha" },
      { key: "hora", replacement: "Hora" },
      { key: "montoPagado", replacement: "Monto pagado" },
      { key: "puntosUtilizados", replacement: "Puntos utilizados" }
    ]
    this.bill = {} as Bill
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'))
    // this.billService.getBill(id)
    //   .subscribe(response => {
    //     if (response.status === 'error') {
    //       this.messageService.setMessageInfo(response.message!, 'error')
    //     }
    //     else if (response.bill) {
    //       this.bill = response.bill

    //       this.formsService.form.get('id')?.setValue(this.bill.id)
    //     }
    //     else {
    //       console.log(response)
    //     }
    //   })
  }
}
