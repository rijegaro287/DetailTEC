import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { Employee } from 'src/app/Interfaces/Employee';

import { FormsService } from 'src/app/Services/forms.service';
import { AuxFunctionsService } from 'src/app/Services/aux-functions.service';

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

  @Input() employeeInfo?: Employee

  constructor(
    private auxFunctionsService: AuxFunctionsService,
    protected formsService: FormsService
  ) {
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

    if (this.employeeInfo) {
      const { edad, ...employeeInfo } = this.employeeInfo as any

      employeeInfo.fechaInicio = this.auxFunctionsService
        .stringToDate(this.employeeInfo.fechaInicio)

      employeeInfo.fechaNacimiento = this.auxFunctionsService
        .stringToDate(this.employeeInfo.fechaNacimiento)

      this.formsService.setFormValue(employeeInfo);
    }
  }

  onSubmit = () => {
    if (this.employeeInfo) {
      // Modify employee info
    } else {
      // Add new employee
    }
    this.formsService.printFormValue()
  }
}
