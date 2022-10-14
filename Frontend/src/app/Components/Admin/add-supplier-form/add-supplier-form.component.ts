import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { Supplier } from 'src/app/Interfaces/Supplier';

import { AuxFunctionsService } from 'src/app/Services/aux-functions.service';
import { FormsService } from 'src/app/Services/forms.service';

@Component({
  selector: 'app-add-supplier-form',
  templateUrl: './add-supplier-form.component.html',
  styleUrls: ['./add-supplier-form.component.scss']
})
export class AddSupplierFormComponent implements OnInit {
  id: FormControl
  nombre: FormControl
  email: FormControl
  direccion: FormControl

  @Input() supplierInfo?: Supplier

  constructor(
    private auxFunctionsService: AuxFunctionsService,
    protected formsService: FormsService
  ) {
    this.id = new FormControl('', [Validators.required])
    this.nombre = new FormControl('', [Validators.required])
    this.email = new FormControl('', [Validators.required])
    this.direccion = new FormControl('', [Validators.required])
  }

  ngOnInit(): void {
    this.formsService.resetForm()

    this.formsService.form.addControl('id', this.id)
    this.formsService.form.addControl('nombre', this.nombre)
    this.formsService.form.addControl('email', this.email)
    this.formsService.form.addControl('direccion', this.direccion)

    if (this.supplierInfo) {
      this.formsService.patchFormValue(this.supplierInfo);
    }
  }

  onSubmit = () => {
    if (this.supplierInfo) {
      // Modify supplier info
    } else {
      // Add new supplier
    }
    this.formsService.printFormValue()
  }
}
