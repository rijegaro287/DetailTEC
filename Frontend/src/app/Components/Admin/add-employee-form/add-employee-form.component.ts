import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { FormsService } from 'src/app/Services/forms.service';

@Component({
  selector: 'app-add-employee-form',
  templateUrl: './add-employee-form.component.html',
  styleUrls: ['./add-employee-form.component.scss']
})
export class AddEmployeeFormComponent implements OnInit {
  nombre: FormControl
  apellido: FormControl
  id: FormControl
  email: FormControl
  fechaNacimiento: FormControl
  puesto: FormControl
  fechaInicio: FormControl
  frecuenciaPago: FormControl

  constructor(protected formsService: FormsService) {
    this.nombre = new FormControl('', [Validators.required])
    this.apellido = new FormControl('', [Validators.required])
    this.id = new FormControl('', [Validators.required])
    this.email = new FormControl('', [Validators.required])
    this.fechaNacimiento = new FormControl('', [Validators.required])
    this.puesto = new FormControl('', [Validators.required])
    this.fechaInicio = new FormControl('', [Validators.required])
    this.frecuenciaPago = new FormControl('', [Validators.required])
  }

  ngOnInit(): void {
    this.formsService.resetForm()

    this.formsService.form.addControl('nombre', this.nombre)
    this.formsService.form.addControl('apellido', this.apellido)
    this.formsService.form.addControl('id', this.id)
    this.formsService.form.addControl('email', this.email)
    this.formsService.form.addControl('fechaNacimiento', this.fechaNacimiento)
    this.formsService.form.addControl('puesto', this.puesto)
    this.formsService.form.addControl('fechaInicio', this.fechaInicio)
    this.formsService.form.addControl('frecuenciaPago', this.frecuenciaPago)
  }

  onSubmit = () => {
    this.formsService.printFormValue()
  }
}
