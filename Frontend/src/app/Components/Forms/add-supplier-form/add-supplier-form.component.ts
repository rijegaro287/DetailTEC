import { Component, Input, OnChanges, OnInit } from '@angular/core'
import { FormArray, FormControl, Validators } from '@angular/forms'

import { ServerResponse } from 'src/app/Interfaces/ServerResponses'
import { Supplier } from 'src/app/Interfaces/Supplier'
import { AuxFunctionsService } from 'src/app/Services/aux-functions.service'

import { FormsService } from 'src/app/Services/forms.service'
import { SupplierService } from 'src/app/Services/supplier.service'

@Component({
  selector: 'app-add-supplier-form',
  templateUrl: './add-supplier-form.component.html',
  styleUrls: ['./add-supplier-form.component.scss']
})
export class AddSupplierFormComponent implements OnInit, OnChanges {
  id: FormControl
  nombre: FormControl
  email: FormControl
  direccion: FormControl
  telefonos: FormArray

  @Input() supplierInfo?: Supplier

  constructor(
    private supplierService: SupplierService,
    private auxFunctionsService: AuxFunctionsService,
    protected formsService: FormsService
  ) {
    this.id = new FormControl('', [Validators.required])
    this.nombre = new FormControl('', [Validators.required])
    this.email = new FormControl('', [Validators.required])
    this.direccion = new FormControl('', [Validators.required])
    this.telefonos = new FormArray([new FormControl('')], [Validators.required])
  }

  ngOnInit(): void {
    this.formsService.resetForm()

    this.formsService.form.addControl('id', this.id)
    this.formsService.form.addControl('nombre', this.nombre)
    this.formsService.form.addControl('email', this.email)
    this.formsService.form.addControl('direccion', this.direccion)
    this.formsService.form.addControl('telefonos', this.telefonos)
  }

  ngOnChanges(): void {
    if (this.supplierInfo && Object.keys(this.supplierInfo).length) {
      this.formsService.patchFormValue(this.supplierInfo)

      const telFormArray: FormArray = this.formsService
        .form.controls['telefonos'] as any

      telFormArray.removeAt(0)

      this.supplierInfo.telefonos.forEach(tel => {
        telFormArray.push(new FormControl(tel))
      })
    }
  }

  onSubmit = async () => {
    if (this.supplierInfo) {
      // Modify supplier info
    } else {
      await this.createSupplier()
        .then(response => {
          this.auxFunctionsService.handleResponse(response)
        })
    }
  }

  createSupplier = (): Promise<ServerResponse> => {
    const newSupplierInfo: Supplier = this.formsService.getFormValue()

    return new Promise((resolve, reject) => {
      this.supplierService.createSupplier(newSupplierInfo)
        .subscribe((response: ServerResponse) => resolve(response))
    })
  }

  updateSupplier = (): Promise<ServerResponse> => {
    const newSupplierInfo: Supplier = this.formsService.getFormValue()

    return new Promise((resolve, reject) => {
      this.supplierService.updateSupplier(this.supplierInfo!.id, newSupplierInfo)
        .subscribe((response: ServerResponse) => resolve(response))
    })
  }
}
