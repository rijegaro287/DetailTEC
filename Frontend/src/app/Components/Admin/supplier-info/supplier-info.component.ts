import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { KeyReplacement } from 'src/app/Interfaces/Auxiliaries'
import { Supplier } from 'src/app/Interfaces/Supplier'
import { AuxFunctionsService } from 'src/app/Services/aux-functions.service'

import { MessageService } from 'src/app/Services/message.service'
import { SupplierService } from 'src/app/Services/supplier.service'

@Component({
  selector: 'app-supplier-info',
  templateUrl: './supplier-info.component.html',
  styleUrls: ['./supplier-info.component.scss']
})
export class AdminSupplierInfoComponent implements OnInit {
  supplierInfoTitles: KeyReplacement<Supplier>[]
  supplier: Supplier

  constructor(
    private route: ActivatedRoute,
    private supplierService: SupplierService,
    protected auxFunctionsService: AuxFunctionsService,
    protected messageService: MessageService
  ) {
    this.supplierInfoTitles = [
      { key: "id", replacement: "Cédula jurídica" },
      { key: "nombre", replacement: "Nombre" },
      { key: "email", replacement: "Correo electrónico" },
      { key: "telefonos", replacement: "Teléfonos" },
      { key: "direccion", replacement: "Dirección" }
    ]

    this.supplier = {} as Supplier
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'))
    this.supplierService.getSupplier(id)
      .subscribe(response => {
        if (response.status === 'error') {
          this.messageService.setMessageInfo(response.message!, 'error')
        }
        else if (response.supplier) {
          this.supplier = response.supplier
        }
        else {
          console.log(response)
        }
      })
  }

  deleteSupplier = () => {
    this.supplierService.deleteSupplier(this.supplier.id)
      .subscribe(response => {
        if (response.status === 'error') {
          this.messageService.setMessageInfo(response.message!, 'error')
        }
        else {
          window.location.href = '/admin/suppliers'
        }
      })
  }
}
