import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core'
import { FormControl, Validators } from '@angular/forms'

import { AuxFunctionsService } from 'src/app/Services/aux-functions.service'
import { EmployeeService } from 'src/app/Services/employee.service'
import { FormsService } from 'src/app/Services/forms.service'
import { MessageService } from 'src/app/Services/message.service'
import { BranchService } from 'src/app/Services/branch.service'

import { Branch } from 'src/app/Interfaces/Branch'
import { Employee } from 'src/app/Interfaces/Employee'
import { ServerResponse } from 'src/app/Interfaces/ServerResponses'

@Component({
  selector: 'app-add-branch-form',
  templateUrl: './add-branch-form.component.html',
  styleUrls: ['./add-branch-form.component.scss']
})
export class AddBranchFormComponent implements OnInit, OnChanges {
  id: FormControl
  nombre: FormControl
  provincia: FormControl
  canton: FormControl
  distrito: FormControl
  telefono: FormControl
  idGerente: FormControl
  fechaInicioGerente: FormControl
  fechaApertura: FormControl
  employees: Employee[]

  @Input() branchInfo?: Branch

  constructor(
    private auxFunctionsService: AuxFunctionsService,
    private branchService: BranchService,
    private employeeService: EmployeeService,
    private messageService: MessageService,
    protected formsService: FormsService
  ) {
    this.id = new FormControl('', [Validators.required])
    this.nombre = new FormControl('', [Validators.required])
    this.provincia = new FormControl('', [Validators.required])
    this.canton = new FormControl('', [Validators.required])
    this.distrito = new FormControl('', [Validators.required])
    this.telefono = new FormControl('', [Validators.required])
    this.idGerente = new FormControl('', [Validators.required])
    this.fechaInicioGerente = new FormControl('', [Validators.required])
    this.fechaApertura = new FormControl('', [Validators.required])

    this.employees = []
  }

  ngOnInit(): void {
    this.formsService.resetForm()

    this.formsService.form.addControl('id', this.id)
    this.formsService.form.addControl('nombre', this.nombre)
    this.formsService.form.addControl('provincia', this.provincia)
    this.formsService.form.addControl('canton', this.canton)
    this.formsService.form.addControl('distrito', this.distrito)
    this.formsService.form.addControl('telefono', this.telefono)
    this.formsService.form.addControl('idGerente', this.idGerente)
    this.formsService.form.addControl('fechaInicioGerente', this.fechaInicioGerente)
    this.formsService.form.addControl('fechaApertura', this.fechaApertura)

    this.getEmployees()
      .then((employees) => { this.employees = employees })
  }

  ngOnChanges(): void {
    if (this.branchInfo && Object.keys(this.branchInfo).length) {
      const { ...branchInfo } = this.branchInfo as any

      branchInfo.fechaApertura = this.auxFunctionsService
        .stringToDate(this.branchInfo.fechaApertura)

      branchInfo.fechaInicioGerente = this.auxFunctionsService
        .stringToDate(this.branchInfo.fechaInicioGerente)

      this.formsService.patchFormValue(branchInfo)
      this.formsService.form.controls['idGerente']
        .setValue(this.branchInfo.idGerente)
    }
  }

  onSubmit = async () => {
    if (this.branchInfo && Object.keys(this.branchInfo).length) {
      await this.updateBranch()
        .then((response: ServerResponse) => {
          if (response.status === 'error') {
            this.messageService.setMessageInfo(response.message!, 'error')
          }
          else {
            if (this.branchInfo!.id !== this.formsService.form.value.id) {
              window.location.href =
                `/admin/branches/${this.formsService.form.value.id}`
            }
            else {
              window.location.reload()
            }
          }
        })
    } else {
      await this.createBranch()
        .then((response) => {
          this.auxFunctionsService.handleResponse(response)
        })
    }
  }

  getEmployees = (): Promise<Employee[]> => {
    return new Promise((resolve, reject) => {
      this.employeeService.getAllEmployees()
        .subscribe(response => {
          if (response.status === 'error') {
            this.messageService.setMessageInfo(response.message!, 'error')
          }
          else if (response.employees) {
            resolve(response.employees)
          }
          else {
            console.log(response)
          }
        })
    })
  }

  createBranch = (): Promise<ServerResponse> => {
    return new Promise((resolve, reject) => {
      const newBranchInfo = this.formsService.getFormValue()

      this.branchService.createBranch(newBranchInfo)
        .subscribe((response: ServerResponse) => resolve(response))
    })
  }

  updateBranch = (): Promise<ServerResponse> => {
    return new Promise((resolve, reject) => {
      const newBranchInfo = this.formsService.getFormValue()

      this.branchService.updateBranch(this.branchInfo!.id, newBranchInfo)
        .subscribe((response: ServerResponse) => resolve(response))
    })
  }
}