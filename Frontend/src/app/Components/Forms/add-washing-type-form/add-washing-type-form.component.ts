import { Component, Input, OnChanges, OnInit } from '@angular/core'
import { FormArray, FormControl, Validators } from '@angular/forms'

import { WashingType } from 'src/app/Interfaces/WashingType'
import { Product } from 'src/app/Interfaces/Product'
import { SelectOption } from 'src/app/Interfaces/Auxiliaries'
import { ServerResponse } from 'src/app/Interfaces/ServerResponses'

import { FormsService } from 'src/app/Services/forms.service'
import { AuxFunctionsService } from 'src/app/Services/aux-functions.service'
import { WashingTypeService } from 'src/app/Services/washing-type.service'
import { ProductService } from 'src/app/Services/product.service'
import { MessageService } from 'src/app/Services/message.service'

@Component({
  selector: 'app-add-washing-type-form',
  templateUrl: './add-washing-type-form.component.html',
  styleUrls: ['./add-washing-type-form.component.scss']
})
export class AddWashingTypeFormComponent implements OnInit, OnChanges {
  id: FormControl
  nombre: FormControl
  duracionMinutos: FormControl
  cantidadEmpleados: FormControl
  comisionEmpleado: FormControl
  precio: FormControl
  idProductos: FormArray
  puntuacion: FormControl
  allProducts: Product[]
  productOptions: SelectOption[]
  cost: number

  @Input() washingTypeInfo?: WashingType

  constructor(
    private productService: ProductService,
    private washingTypeService: WashingTypeService,
    private auxFunctionsService: AuxFunctionsService,
    protected messageService: MessageService,
    protected formsService: FormsService
  ) {
    this.id = new FormControl('', [Validators.required])
    this.nombre = new FormControl('', [Validators.required])
    this.duracionMinutos = new FormControl('', [Validators.required])
    this.cantidadEmpleados = new FormControl(0, [Validators.required])
    this.comisionEmpleado = new FormControl(0, [Validators.required])
    this.precio = new FormControl('', [Validators.required])
    this.idProductos = new FormArray([new FormControl('')], [Validators.required])
    this.puntuacion = new FormControl('', [Validators.required])

    this.allProducts = []
    this.productOptions = []

    this.cost = 0
  }

  ngOnInit(): void {
    this.formsService.resetForm()

    this.formsService.form.addControl('id', this.id)
    this.formsService.form.addControl('nombre', this.nombre)
    this.formsService.form.addControl('duracionMinutos', this.duracionMinutos)
    this.formsService.form.addControl('cantidadEmpleados', this.cantidadEmpleados)
    this.formsService.form.addControl('comisionEmpleado', this.comisionEmpleado)
    this.formsService.form.addControl('precio', this.precio)
    this.formsService.form.addControl('idProductos', this.idProductos)
    this.formsService.form.addControl('puntuacion', this.puntuacion)

    this.getProducts()
      .then((products) => {
        this.allProducts = products

        this.productOptions = this.allProducts
          .map((product): SelectOption => {
            return { value: product.id, text: product.nombre }
          })
      })
  }

  ngOnChanges(): void {
    if (this.washingTypeInfo && Object.keys(this.washingTypeInfo).length) {
      this.formsService.patchFormValue(this.washingTypeInfo)

      const productsFormArray: FormArray = this.formsService
        .form.controls['idProductos'] as any

      productsFormArray.removeAt(0)

      this.washingTypeInfo.idProductos.forEach(productID => {
        productsFormArray.push(new FormControl(productID))
      })

      this.cost = this.washingTypeInfo.costo
    }

  }

  onSubmit = async () => {
    this.formsService.getFormValue().costo = this.cost

    if (this.washingTypeInfo && Object.keys(this.washingTypeInfo).length) {
      await this.updateWashingType()
        .then((response: ServerResponse) => {
          if (response.status === 'error') {
            this.messageService.setMessageInfo(response.message!, 'error')
          }
          else {
            if (this.washingTypeInfo!.id !== this.formsService.form.value.id) {
              window.location.href =
                `/admin/washing_types/${this.formsService.form.value.id}`
            }
            else {
              window.location.reload()
            }
          }
        })
    } else {
      await this.createWashingType()
        .then(response => {
          this.auxFunctionsService.handleResponse(response)
        })
    }
  }

  getProducts = (): Promise<Product[]> => {
    return new Promise((resolve, reject) => {
      this.productService.getAllProducts()
        .subscribe(response => {
          if (response.status === 'error') {
            this.messageService.setMessageInfo(response.message!, 'error')
          }
          else if (response.products) {
            resolve(response.products)
          }
          else {
            console.log(response)
          }
        })
    })
  }

  calculateCost = () => {
    this.cost = 0

    const selectedProductsID = this.formsService.form
      .controls['idProductos'].value

    const employeeNumber = this.formsService.form
      .controls['cantidadEmpleados'].value

    const employeeCommission = this.formsService.form
      .controls['comisionEmpleado'].value

    this.cost += Number(employeeNumber) * Number(employeeCommission)

    selectedProductsID.forEach((id: number) => {
      const product = this.allProducts
        .find(product => product.id === Number(id))

      if (product) this.cost += product.precio
    })
  }

  createWashingType = (): Promise<ServerResponse> => {
    return new Promise((resolve, reject) => {
      const newWashingTypeInfo = this.formsService.getFormValue()

      this.washingTypeService.createWashingType(newWashingTypeInfo)
        .subscribe((response: ServerResponse) => resolve(response))
    })
  }

  updateWashingType = (): Promise<ServerResponse> => {
    return new Promise((resolve, reject) => {
      const newWashingTypeInfo = this.formsService.getFormValue()

      this.washingTypeService.updateWashingType(this.washingTypeInfo!.id, newWashingTypeInfo)
        .subscribe((response: ServerResponse) => resolve(response))
    })
  }
}
