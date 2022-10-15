import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, Validators } from '@angular/forms';

import { WashingType } from 'src/app/Interfaces/WashingType';
import { Product } from 'src/app/Interfaces/Product';
import { SelectOption } from 'src/app/Interfaces/Auxiliaries';

import { FormsService } from 'src/app/Services/forms.service';
import { ProductService } from 'src/app/Services/product.service';
import { MessageService } from 'src/app/Services/message.service';

@Component({
  selector: 'app-add-washing-type-form',
  templateUrl: './add-washing-type-form.component.html',
  styleUrls: ['./add-washing-type-form.component.scss']
})
export class AddWashingTypeFormComponent implements OnInit {
  nombre: FormControl
  duracionMinutos: FormControl
  costo: FormControl
  precio: FormControl
  productos: FormArray
  puntuacion: FormControl
  productOptions: SelectOption[]

  @Input() washingTypeInfo?: WashingType

  constructor(
    private productService: ProductService,
    protected messageService: MessageService,
    protected formsService: FormsService
  ) {
    this.nombre = new FormControl('', [Validators.required])
    this.duracionMinutos = new FormControl('', [Validators.required])
    this.costo = new FormControl('', [Validators.required])
    this.precio = new FormControl('', [Validators.required])
    this.productos = new FormArray([new FormControl('')], [Validators.required])
    this.puntuacion = new FormControl('', [Validators.required])

    this.productOptions = this.getProducts()
      .map((product): SelectOption => {
        return { value: product.nombre, text: product.nombre }
      })
  }

  ngOnInit(): void {
    this.formsService.resetForm()

    this.formsService.form.addControl('nombre', this.nombre)
    this.formsService.form.addControl('duracionMinutos', this.duracionMinutos)
    this.formsService.form.addControl('costo', this.costo)
    this.formsService.form.addControl('precio', this.precio)
    this.formsService.form.addControl('productos', this.productos)
    this.formsService.form.addControl('puntuacion', this.puntuacion)

    if (this.washingTypeInfo) {
      this.formsService.patchFormValue(this.washingTypeInfo);

      const productsFormArray: FormArray = this.formsService
        .form.controls['productos'] as any

      productsFormArray.removeAt(0)

      this.washingTypeInfo.nombresProductos.forEach(productName => {
        productsFormArray.push(new FormControl(productName))
      })

    }
  }

  onSubmit = () => {
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
}
