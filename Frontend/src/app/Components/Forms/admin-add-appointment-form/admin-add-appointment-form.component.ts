import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, Validators } from '@angular/forms';

import { Appointment } from 'src/app/Interfaces/Appointment';
import { Branch } from 'src/app/Interfaces/Branch';
import { Client } from 'src/app/Interfaces/Client';
import { WashingType } from 'src/app/Interfaces/WashingType';
import { Employee } from 'src/app/Interfaces/Employee';
import { SelectOption } from 'src/app/Interfaces/Auxiliaries';

import { BranchService } from 'src/app/Services/branch.service';
import { ClientService } from 'src/app/Services/client.service';
import { FormsService } from 'src/app/Services/forms.service';
import { MessageService } from 'src/app/Services/message.service';
import { AuxFunctionsService } from 'src/app/Services/aux-functions.service';
import { WashingTypeService } from 'src/app/Services/washing-type.service';
import { EmployeeService } from 'src/app/Services/employee.service';

@Component({
  selector: 'app-admin-add-appointment-form',
  templateUrl: './admin-add-appointment-form.component.html',
  styleUrls: ['./admin-add-appointment-form.component.scss']
})
export class AdminAddAppointmentFormComponent implements OnInit {
  @Input() appointmentInfo?: Appointment

  clientID: FormControl
  licensePlate: FormControl
  washingType: FormControl
  branch: FormControl
  date: FormControl
  time: FormControl
  assignedEmployees: FormArray

  clients: Client[]
  branches: Branch[]
  washingTypes: WashingType[]

  employeeOptions: SelectOption[]

  selectedClientID: string
  neededEmployees: number

  constructor(
    private clientService: ClientService,
    private employeeService: EmployeeService,
    private branchService: BranchService,
    private washingTypeService: WashingTypeService,
    private messageService: MessageService,
    private auxFunctionsService: AuxFunctionsService,
    protected formsService: FormsService
  ) {
    this.clientID = new FormControl('', [Validators.required])
    this.licensePlate = new FormControl('', [Validators.required])
    this.washingType = new FormControl('', [Validators.required])
    this.branch = new FormControl('', [Validators.required])
    this.date = new FormControl('', [Validators.required])
    this.time = new FormControl('', [Validators.required])
    this.assignedEmployees = new FormArray([new FormControl('')], [Validators.required])

    this.clients = []
    this.branches = []
    this.washingTypes = []

    this.employeeOptions = this.getEmployees()
      .map((employee): SelectOption => {
        return {
          value: employee.id.toString(),
          text: `${employee.nombre} ${employee.apellido1} ${employee.apellido2} #${employee.id}#`
        }
      })

    this.selectedClientID = ''
    this.neededEmployees = 0
  }

  ngOnInit(): void {
    this.formsService.resetForm()

    this.clients = this.getClients()
    this.branches = this.getBranches()
    this.washingTypes = this.getWashingTypes()
    this.assignedEmployees.removeAt(0)

    this.formsService.form.addControl('idCliente', this.clientID)
    this.formsService.form.addControl('placaVehiculo', this.licensePlate)
    this.formsService.form.addControl('nombreSucursal', this.branch)
    this.formsService.form.addControl('tipoLavado', this.washingType)
    this.formsService.form.addControl('fecha', this.date)
    this.formsService.form.addControl('hora', this.time)
    this.formsService.form.addControl('idEmpleados', this.assignedEmployees)

    if (this.appointmentInfo) {
      const { ...appointmentInfo } = this.appointmentInfo as any

      const selectedWashingType = this.washingTypes
        .find((washingType) => washingType.nombre == appointmentInfo.tipoLavado)!

      this.neededEmployees = selectedWashingType.cantidadEmpleados

      appointmentInfo.fecha = this.auxFunctionsService
        .stringToDate(this.appointmentInfo.fecha)

      appointmentInfo.hora = this.auxFunctionsService
        .stringToTime(this.appointmentInfo.hora)

      this.selectedClientID = appointmentInfo.idCliente
      this.formsService.form.patchValue(appointmentInfo)

      const assignedEmployeesFormArray: FormArray = this.formsService
        .form.controls['idEmpleados'] as any

      this.appointmentInfo.idEmpleados.forEach(idEmpleado => {
        assignedEmployeesFormArray.push(new FormControl(idEmpleado))
      })
    }
  }

  getClients = (): Client[] => {
    let clients: Client[] = []

    this.clientService.getAllClients()
      .subscribe(response => {
        if (response.status == "error") {
          this.messageService.setMessageInfo(response.message!, "error")
        }
        else if (response.clients) {
          clients = response.clients
        }
        else {
          console.log(response)
        }
      })

    return clients
  }

  getEmployees = (): Employee[] => {
    let employees: Employee[] = []

    this.employeeService.getAllEmployees()
      .subscribe(response => {
        if (response.status == "error") {
          this.messageService.setMessageInfo(response.message!, "error")
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

  getBranches = (): Branch[] => {
    let branches: Branch[] = []

    this.branchService.getAllBranches()
      .subscribe(response => {
        if (response.status == "error") {
          this.messageService.setMessageInfo(response.message!, "error")
        }
        else if (response.branches) {
          branches = response.branches
        }
        else {
          console.log(response)
        }
      })

    return branches
  }

  getWashingTypes = (): WashingType[] => {
    let washingTypes: WashingType[] = []

    this.washingTypeService.getAllWashingTypes()
      .subscribe(response => {
        if (response.status == "error") {
          this.messageService.setMessageInfo(response.message!, "error")
        }
        else if (response.washingTypes) {
          washingTypes = response.washingTypes
        }
        else {
          console.log(response)
        }
      })

    return washingTypes
  }

  setClientIDLabel = () => {
    this.selectedClientID = this.formsService.form
      .controls['idCliente'].value
  }

  setNeededEmployees = () => {
    const washingTypeName = this.formsService.form
      .controls['tipoLavado'].value

    const selectedWashingType = this.washingTypes
      .find((washingType) => washingType.nombre == washingTypeName)!

    this.neededEmployees = selectedWashingType.cantidadEmpleados

    const assignedEmployees: FormArray = this.formsService
      .form.controls['idEmpleados'] as any

    while (assignedEmployees.value.length > this.neededEmployees) {
      assignedEmployees.removeAt(assignedEmployees.length - 1)
    }
  }

  onSubmit() {
    this.formsService.printFormValue()
  }
}