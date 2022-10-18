import { Component, Input, OnInit } from '@angular/core'
import { FormControl, Validators } from '@angular/forms'

import { AuxFunctionsService } from 'src/app/Services/aux-functions.service'
import { EmployeeService } from 'src/app/Services/employee.service'
import { FormsService } from 'src/app/Services/forms.service'

import { Branch } from 'src/app/Interfaces/Branch'
import { Employee } from 'src/app/Interfaces/Employee'
import { MessageService } from 'src/app/Services/message.service'

@Component({
  selector: 'app-add-branch-form',
  templateUrl: './add-branch-form.component.html',
  styleUrls: ['./add-branch-form.component.scss']
})
export class AddBranchFormComponent implements OnInit {
  nombre: FormControl
  provincia: FormControl
  canton: FormControl
  distrito: FormControl
  telefono: FormControl
  idGerente: FormControl
  fechaApertura: FormControl
  employees: Employee[]

  @Input() branchInfo?: Branch

  constructor(
    private auxFunctionsService: AuxFunctionsService,
    private employeeService: EmployeeService,
    private messageService: MessageService,
    protected formsService: FormsService
  ) {
    this.nombre = new FormControl('', [Validators.required])
    this.provincia = new FormControl('', [Validators.required])
    this.canton = new FormControl('', [Validators.required])
    this.distrito = new FormControl('', [Validators.required])
    this.telefono = new FormControl('', [Validators.required])
    this.idGerente = new FormControl('', [Validators.required])
    this.fechaApertura = new FormControl('', [Validators.required])

    this.employees = this.getEmployees()
  }

  ngOnInit(): void {
    this.formsService.resetForm()

    this.formsService.form.addControl('nombre', this.nombre)
    this.formsService.form.addControl('provincia', this.provincia)
    this.formsService.form.addControl('canton', this.canton)
    this.formsService.form.addControl('distrito', this.distrito)
    this.formsService.form.addControl('telefono', this.telefono)
    this.formsService.form.addControl('idGerente', this.idGerente)
    this.formsService.form.addControl('fechaApertura', this.fechaApertura)

    if (this.branchInfo) {
      const { ...branchInfo } = this.branchInfo as any

      branchInfo.fechaApertura = this.auxFunctionsService
        .stringToDate(this.branchInfo.fechaApertura)

      this.formsService.patchFormValue(branchInfo)
      this.formsService.form.controls['idGerente']
        .setValue(this.branchInfo.idGerente)
    }
  }

  onSubmit = () => {
    if (this.branchInfo) {
      // Modify branch info
    } else {
      // Add new branch
    }
    this.formsService.printFormValue()
  }

  getEmployees = (): Employee[] => {
    let employees: Employee[] = []

    this.employeeService.getAllEmployees()
      .subscribe(response => {
        if (response.status === 'error') {
          this.messageService.setMessageInfo(response.message!, 'error')
        }
        else if (response.employees) {
          employees = response.employees
        }
        else {
          console.log(response)
        }
      })

    return employees
  }
}
