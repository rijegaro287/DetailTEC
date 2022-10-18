import { Component, Input, OnInit } from '@angular/core'
import { FormControl, Validators } from '@angular/forms'

import { Product } from 'src/app/Interfaces/Product'
import { Supplier } from 'src/app/Interfaces/Supplier'

import { FormsService } from 'src/app/Services/forms.service'
import { SupplierService } from 'src/app/Services/supplier.service'
import { MessageService } from 'src/app/Services/message.service'

@Component({
  selector: 'app-add-product-form',
  templateUrl: './add-product-form.component.html',
  styleUrls: ['./add-product-form.component.scss']
})
export class AddProductFormComponent implements OnInit {
  marca: FormControl
  nombre: FormControl
  precio: FormControl
  proveedor: FormControl
  suppliers: Supplier[]

  @Input() productInfo?: Product

  constructor(
    private messageService: MessageService,
    private supplierService: SupplierService,
    protected formsService: FormsService
  ) {
    this.nombre = new FormControl('', [Validators.required])
    this.marca = new FormControl('', [Validators.required])
    this.proveedor = new FormControl('', [Validators.required])
    this.precio = new FormControl('', [Validators.required])

    this.suppliers = this.getSuppliers()
  }

  ngOnInit(): void {
    this.formsService.resetForm()

    this.formsService.form.addControl('nombre', this.nombre)
    this.formsService.form.addControl('marca', this.marca)
    this.formsService.form.addControl('proveedor', this.proveedor)
    this.formsService.form.addControl('precio', this.precio)

    if (this.productInfo) {
      const { ...productInfo } = this.productInfo as any

      this.formsService.patchFormValue(productInfo)
      this.formsService.form.controls['proveedor']
        .setValue(this.productInfo.idProveedor)
    }
  }

  onSubmit = () => {
    if (this.productInfo) {
      // Modify product info
    } else {
      // Add new product
    }
    this.formsService.printFormValue()
  }

  getSuppliers = (): Supplier[] => {
    let suppliers: Supplier[] = []

    this.supplierService.getAllSuppliers()
      .subscribe(response => {
        if (response.status === 'error') {
          this.messageService.setMessageInfo(response.message!, 'error')
        }
        else if (response.suppliers) {
          suppliers = response.suppliers
        }
        else {
          console.log(response)
        }
      })

    return suppliers
  }
}
