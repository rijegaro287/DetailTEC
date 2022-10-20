import { Component, OnInit } from '@angular/core'

import { KeyReplacement } from 'src/app/Interfaces/Auxiliaries'
import { Supplier } from 'src/app/Interfaces/Supplier'

import { MessageService } from 'src/app/Services/message.service'
import { SupplierService } from 'src/app/Services/supplier.service'

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.scss']
})
export class AdminSuppliersComponent implements OnInit {
  tableColumns: KeyReplacement<Supplier>[]
  tableData: Supplier[]

  constructor(
    private supplierService: SupplierService,
    protected messageService: MessageService
  ) {
    this.tableColumns = [
      { key: "nombre", replacement: "Nombre" },
      { key: "email", replacement: "Correo" },
      { key: "direccion", replacement: "Dirección" }
    ]

    this.tableData = []
  }

  ngOnInit(): void {
    this.messageService.resetMessageInfo()

    this.supplierService.getAllSuppliers()
      .subscribe(response => {
        if (response.status === 'error') {
          this.messageService.setMessageInfo(response.message!, 'error')
        }
        else if (response.suppliers) {
          this.tableData = response.suppliers
        }
        else {
          console.log(response)
        }
      })
  }
}
