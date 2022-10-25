import { Component, Input, OnInit, OnChanges } from '@angular/core'
import { FormControl, Validators } from '@angular/forms'

import { Employee } from 'src/app/Interfaces/Employee'
import { EmployeeService } from 'src/app/Services/employee.service'
import { ServerResponse } from 'src/app/Interfaces/ServerResponses'

import { FormsService } from 'src/app/Services/forms.service'
import { AuxFunctionsService } from 'src/app/Services/aux-functions.service'

@Component({
  selector: 'app-add-employee-form',
  templateUrl: './add-employee-form.component.html',
  styleUrls: ['./add-employee-form.component.scss']
})
export class AddEmployeeFormComponent implements OnInit, OnChanges {
  nombre: FormControl
  apellido1: FormControl
  apellido2: FormControl
  id: FormControl
  email: FormControl
  fechaNacimiento: FormControl
  puesto: FormControl
  fechaInicio: FormControl
  frecuenciaPago: FormControl

  @Input() employeeInfo?: Employee

  constructor(
    private auxFunctionsService: AuxFunctionsService,
    private employeeService: EmployeeService,
    protected formsService: FormsService
  ) {
    this.nombre = new FormControl('', [Validators.required])
    this.apellido1 = new FormControl('', [Validators.required])
    this.apellido2 = new FormControl('', [Validators.required])
    this.id = new FormControl('', [Validators.required])
    this.email = new FormControl('', [Validators.required, Validators.email])
    this.fechaNacimiento = new FormControl('', [Validators.required])
    this.puesto = new FormControl('', [Validators.required])
    this.fechaInicio = new FormControl('', [Validators.required])
    this.frecuenciaPago = new FormControl('', [Validators.required])
  }

  ngOnInit(): void {
    this.formsService.resetForm()

    this.formsService.form.addControl('nombre', this.nombre)
    this.formsService.form.addControl('apellido1', this.apellido1)
    this.formsService.form.addControl('apellido2', this.apellido2)
    this.formsService.form.addControl('id', this.id)
    this.formsService.form.addControl('email', this.email)
    this.formsService.form.addControl('fechaNacimiento', this.fechaNacimiento)
    this.formsService.form.addControl('puesto', this.puesto)
    this.formsService.form.addControl('fechaInicio', this.fechaInicio)
    this.formsService.form.addControl('frecuenciaPago', this.frecuenciaPago)
  }

  ngOnChanges(): void {
    if (this.employeeInfo && Object.keys(this.employeeInfo).length) {
      const { edad, ...employeeInfo } = this.employeeInfo as any

      employeeInfo.fechaInicio = this.auxFunctionsService
        .stringToDate(this.employeeInfo.fechaInicio)

      employeeInfo.fechaNacimiento = this.auxFunctionsService
        .stringToDate(this.employeeInfo.fechaNacimiento)

      this.formsService.patchFormValue(employeeInfo)
    }
  }

  onSubmit = async () => {
    const newEmployeeInfo = this.formsService.getFormValue()
    let serverResponse: ServerResponse = {} as ServerResponse

    if (this.employeeInfo && Object.keys(this.employeeInfo).length) {
      await this.employeeService.createEmployee(newEmployeeInfo)
        .subscribe((response: ServerResponse) => { response = response })
    }
    else {
      await this.employeeService.createEmployee(newEmployeeInfo)
        .subscribe((response: ServerResponse) => { response = response })
    }

    console.log(serverResponse);
  }
}