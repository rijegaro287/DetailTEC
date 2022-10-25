import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { Employee } from 'src/app/Interfaces/Employee';
import { ServerResponse } from 'src/app/Interfaces/ServerResponses';

import { AuxFunctionsService } from 'src/app/Services/aux-functions.service';
import { EmployeeService } from 'src/app/Services/employee.service';
import { FormsService } from 'src/app/Services/forms.service';
import { MessageService } from 'src/app/Services/message.service';

@Component({
  selector: 'app-edit-employee-form',
  templateUrl: './edit-employee-form.component.html',
  styleUrls: ['./edit-employee-form.component.scss']
})
export class EditEmployeeFormComponent implements OnInit, OnChanges {
  nombre: FormControl
  apellido1: FormControl
  apellido2: FormControl
  id: FormControl
  email: FormControl
  fechaNacimiento: FormControl
  puesto: FormControl
  fechaInicio: FormControl
  frecuenciaPago: FormControl
  passwordVieja: FormControl
  password: FormControl
  passwordConfirm: FormControl

  @Input() employeeInfo?: Employee

  constructor(
    private auxFunctionsService: AuxFunctionsService,
    private messageService: MessageService,
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
    this.passwordVieja = new FormControl('', [Validators.required])
    this.password = new FormControl('', [Validators.required])
    this.passwordConfirm = new FormControl('', [Validators.required])
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
    this.formsService.form.addControl('passwordVieja', this.passwordVieja)
    this.formsService.form.addControl('password', this.password)
    this.formsService.form.addControl('passwordConfirm', this.passwordConfirm)
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

  onSubmit = () => {
    const newEmployeeInfo = this.formsService.getFormValue()

    if (newEmployeeInfo.password !== newEmployeeInfo.passwordConfirm) {
      this.messageService.setMessageInfo('Las contraseñas no coinciden', 'error')
      return
    } else {
      this.messageService.resetMessageInfo()
      delete newEmployeeInfo.passwordConfirm
    }

    this.updateEmployee(newEmployeeInfo)
      .then((response) => {
        if (response.status === 'error') {
          this.messageService.setMessageInfo(response.message!, 'error')
        }
        else {
          if (newEmployeeInfo.id !== this.employeeInfo?.id) {
            window.location.href = `/admin/employees/${newEmployeeInfo.id}`
          }
          else {
            window.location.reload();
          }
        }
      })
  }

  updateEmployee = (newEmployeeInfo: Employee): Promise<ServerResponse> => {
    return new Promise((resolve, reject) => {
      if (this.employeeInfo && Object.keys(this.employeeInfo).length) {
        this.employeeService.updateEmployee(this.employeeInfo.id, newEmployeeInfo)
          .subscribe((response: ServerResponse) => resolve(response))
      }
    })
  }
}
