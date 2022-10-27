import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core'
import { FormControl, Validators } from '@angular/forms'

import { Product } from 'src/app/Interfaces/Product'
import { Supplier } from 'src/app/Interfaces/Supplier'
import { ServerResponse } from 'src/app/Interfaces/ServerResponses'

import { FormsService } from 'src/app/Services/forms.service'
import { SupplierService } from 'src/app/Services/supplier.service'
import { MessageService } from 'src/app/Services/message.service'
import { ProductService } from 'src/app/Services/product.service'
import { AuxFunctionsService } from 'src/app/Services/aux-functions.service'

@Component({
  selector: 'app-add-product-form',
  templateUrl: './add-product-form.component.html',
  styleUrls: ['./add-product-form.component.scss']
})
export class AddProductFormComponent implements OnInit, OnChanges {
  id: FormControl
  nombre: FormControl
  marca: FormControl
  costo: FormControl
  precio: FormControl
  idProveedor: FormControl
  suppliers: Supplier[]

  @Input() productInfo?: Product

  constructor(
    private messageService: MessageService,
    private auxFunctionsService: AuxFunctionsService,
    private supplierService: SupplierService,
    private productService: ProductService,
    protected formsService: FormsService
  ) {
    this.id = new FormControl('', [Validators.required])
    this.nombre = new FormControl('', [Validators.required])
    this.marca = new FormControl('', [Validators.required])
    this.idProveedor = new FormControl('', [Validators.required])
    this.costo = new FormControl('', [Validators.required])
    this.precio = new FormControl('', [Validators.required])

    this.suppliers = []
  }

  ngOnInit(): void {
    this.formsService.resetForm()

    this.formsService.form.addControl('id', this.id)
    this.formsService.form.addControl('nombre', this.nombre)
    this.formsService.form.addControl('costo', this.costo)
    this.formsService.form.addControl('precio', this.precio)
    this.formsService.form.addControl('marca', this.marca)
    this.formsService.form.addControl('idProveedor', this.idProveedor)

    this.getSuppliers()
      .then((suppliers) => { this.suppliers = suppliers })
  }

  ngOnChanges(): void {
    if (this.productInfo && Object.keys(this.productInfo).length) {
      const { ...productInfo } = this.productInfo as any

      this.formsService.patchFormValue(productInfo)

      this.formsService.form.controls['idProveedor']
        .setValue(this.productInfo.idProveedor)
    }
  }

  onSubmit = async () => {
    if (this.productInfo && Object.keys(this.productInfo).length) {
      await this.updateProduct()
        .then((response: ServerResponse) => {
          if (response.status === 'error') {
            this.messageService.setMessageInfo(response.message!, 'error')
          }
          else {
            if (this.productInfo!.id !== this.formsService.form.value.id) {
              window.location.href =
                `/admin/products/${this.formsService.form.value.id}`
            }
            else {
              window.location.reload()
            }
          }
        })
    }
    else {
      await this.createProduct()
        .then((response) => {
          this.auxFunctionsService.handleResponse(response)
        })
    }
  }

  getSuppliers = (): Promise<Supplier[]> => {
    return new Promise((resolve, reject) => {
      let suppliers: Supplier[] = []

      this.supplierService.getAllSuppliers()
        .subscribe(response => {
          if (response.status === 'error') {
            this.messageService.setMessageInfo(response.message!, 'error')
          }
          else if (response.suppliers) {
            resolve(response.suppliers)
          }
          else {
            console.log(response)
          }
        })
    })
  }

  createProduct = (): Promise<ServerResponse> => {
    return new Promise((resolve, reject) => {
      const newProductInfo = this.formsService.getFormValue()

      this.productService.createProduct(newProductInfo)
        .subscribe((response: ServerResponse) => resolve(response))
    })
  }

  updateProduct = (): Promise<ServerResponse> => {
    return new Promise((resolve, reject) => {
      const newProductInfo = this.formsService.getFormValue()

      this.productService.updateProduct(this.productInfo!.id, newProductInfo)
        .subscribe((response: ServerResponse) => resolve(response))
    })
  }
}
