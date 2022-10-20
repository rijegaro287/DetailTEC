import { Component, Input, OnInit } from '@angular/core'
import { FormArray, FormControl, Validators } from '@angular/forms'

import { WashingType } from 'src/app/Interfaces/WashingType'
import { Product } from 'src/app/Interfaces/Product'
import { SelectOption } from 'src/app/Interfaces/Auxiliaries'

import { FormsService } from 'src/app/Services/forms.service'
import { ProductService } from 'src/app/Services/product.service'
import { MessageService } from 'src/app/Services/message.service'

@Component({
  selector: 'app-add-washing-type-form',
  templateUrl: './add-washing-type-form.component.html',
  styleUrls: ['./add-washing-type-form.component.scss']
})
export class AddWashingTypeFormComponent implements OnInit {
  nombre: FormControl
  duracionMinutos: FormControl
  cantidadEmpleados: FormControl
  comisionEmpleado: FormControl
  precio: FormControl
  productos: FormArray
  puntuacion: FormControl
  allProducts: Product[]
  productOptions: SelectOption[]
  cost: number


  @Input() washingTypeInfo?: WashingType

  constructor(
    private productService: ProductService,
    protected messageService: MessageService,
    protected formsService: FormsService
  ) {
    this.nombre = new FormControl('', [Validators.required])
    this.duracionMinutos = new FormControl('', [Validators.required])
    this.cantidadEmpleados = new FormControl(0, [Validators.required])
    this.comisionEmpleado = new FormControl(0, [Validators.required])
    this.precio = new FormControl('', [Validators.required])
    this.productos = new FormArray([new FormControl('')], [Validators.required])
    this.puntuacion = new FormControl('', [Validators.required])

    this.allProducts = this.getProducts()

    this.productOptions = this.allProducts
      .map((product): SelectOption => {
        return { value: product.nombre, text: product.nombre }
      })

    this.cost = 0
  }

  ngOnInit(): void {
    this.formsService.resetForm()

    this.formsService.form.addControl('nombre', this.nombre)
    this.formsService.form.addControl('duracionMinutos', this.duracionMinutos)
    this.formsService.form.addControl('cantidadEmpleados', this.cantidadEmpleados)
    this.formsService.form.addControl('comisionEmpleado', this.comisionEmpleado)
    this.formsService.form.addControl('precio', this.precio)
    this.formsService.form.addControl('productos', this.productos)
    this.formsService.form.addControl('puntuacion', this.puntuacion)

    if (this.washingTypeInfo) {
      this.formsService.patchFormValue(this.washingTypeInfo)

      const productsFormArray: FormArray = this.formsService
        .form.controls['productos'] as any

      productsFormArray.removeAt(0)

      this.washingTypeInfo.nombresProductos.forEach(productName => {
        productsFormArray.push(new FormControl(productName))
      })
    }

    this.calculateCost()
  }

  onSubmit = () => {
    this.formsService.getFormValue().costo = this.cost

    if (this.washingTypeInfo) {
      // Modify washingType info
    } else {
      // Add new washingType
    }
    this.formsService.printFormValue()
  }

  getProducts = (): Product[] => {
    let products: Product[] = []

    this.productService.getAllProducts()
      .subscribe(response => {
        if (response.status === 'error') {
          this.messageService.setMessageInfo(response.message!, 'error')
        }
        else if (response.products) {
          products = response.products
        }
        else {
          console.log(response)
        }
      })

    return products
  }

  calculateCost = () => {
    this.cost = 0

    const selectedProductsNames = this.formsService.form
      .controls['productos'].value

    const employeeNumber = this.formsService.form
      .controls['cantidadEmpleados'].value

    const employeeCommission = this.formsService.form
      .controls['comisionEmpleado'].value

    this.cost += Number(employeeNumber) * Number(employeeCommission)

    selectedProductsNames.forEach((name: string) => {
      const product = this.allProducts
        .find(product => product.nombre === name)

      if (product) this.cost += product.precio
    })
  }
}
