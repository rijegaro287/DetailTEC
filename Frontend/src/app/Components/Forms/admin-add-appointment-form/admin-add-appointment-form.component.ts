import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormArray, FormControl, Validators } from '@angular/forms';

import { Appointment } from 'src/app/Interfaces/Appointment';
import { Branch } from 'src/app/Interfaces/Branch';
import { Client } from 'src/app/Interfaces/Client';
import { WashingType } from 'src/app/Interfaces/WashingType';
import { Employee } from 'src/app/Interfaces/Employee';
import { SelectOption } from 'src/app/Interfaces/Auxiliaries';
import { ServerResponse } from 'src/app/Interfaces/ServerResponses';

import { BranchService } from 'src/app/Services/branch.service';
import { ClientService } from 'src/app/Services/client.service';
import { FormsService } from 'src/app/Services/forms.service';
import { MessageService } from 'src/app/Services/message.service';
import { AuxFunctionsService } from 'src/app/Services/aux-functions.service';
import { WashingTypeService } from 'src/app/Services/washing-type.service';
import { EmployeeService } from 'src/app/Services/employee.service';
import { AppointmentsService } from 'src/app/Services/appointments.service';

@Component({
  selector: 'app-admin-add-appointment-form',
  templateUrl: './admin-add-appointment-form.component.html',
  styleUrls: ['./admin-add-appointment-form.component.scss']
})
export class AdminAddAppointmentFormComponent implements OnInit, OnChanges {
  @Input() appointmentInfo?: Appointment

  id: FormControl
  clientID: FormControl
  licensePlate: FormControl
  washingType: FormControl
  branch: FormControl
  date: FormControl
  time: FormControl
  paymentMethod: FormControl
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
    private appointmentService: AppointmentsService,
    private auxFunctionsService: AuxFunctionsService,
    protected formsService: FormsService
  ) {
    this.id = new FormControl('', [Validators.required])
    this.clientID = new FormControl('', [Validators.required])
    this.licensePlate = new FormControl('', [Validators.required])
    this.washingType = new FormControl('', [Validators.required])
    this.branch = new FormControl('', [Validators.required])
    this.date = new FormControl('', [Validators.required])
    this.time = new FormControl('', [Validators.required])
    this.paymentMethod = new FormControl('', [Validators.required])
    this.assignedEmployees = new FormArray([new FormControl('')], [Validators.required])

    this.clients = []
    this.branches = []
    this.washingTypes = []

    this.employeeOptions = []
    this.selectedClientID = ''
    this.neededEmployees = 0
  }

  async ngOnInit(): Promise<void> {
    this.formsService.resetForm()

    this.formsService.form.addControl('id', this.id)
    this.formsService.form.addControl('cedulaCliente', this.clientID)
    this.formsService.form.addControl('placaVehiculo', this.licensePlate)
    this.formsService.form.addControl('idSucursal', this.branch)
    this.formsService.form.addControl('tipoLavado', this.washingType)
    this.formsService.form.addControl('fecha', this.date)
    this.formsService.form.addControl('hora', this.time)
    this.formsService.form.addControl('medioPago', this.paymentMethod)
    this.formsService.form.addControl('idEmpleados', this.assignedEmployees)

    await this.getClients()
      .then((clients) => { this.clients = clients })

    await this.getBranches()
      .then((branches) => { this.branches = branches })

    await this.getWashingTypes()
      .then((washingTypes) => { this.washingTypes = washingTypes })

    await this.getEmployees()
      .then((employees) => {
        employees.forEach((employee) => {
          this.employeeOptions.push(
            {
              value: employee.id.toString(),
              text: `${employee.nombre} ${employee.apellido1} ${employee.apellido2} #${employee.id}#`
            }
          )
        })
      })

    this.assignedEmployees.removeAt(0)
  }

  async ngOnChanges(): Promise<void> {
    await this.getWashingTypes()
      .then((washingTypes) => { this.washingTypes = washingTypes })

    if (this.appointmentInfo && Object.keys(this.appointmentInfo).length) {
      const { ...appointmentInfo } = this.appointmentInfo as any

      const selectedWashingType = this.washingTypes
        .find((washingType) => washingType.id == appointmentInfo.tipoLavado)!

      this.neededEmployees = selectedWashingType.cantidadEmpleados

      appointmentInfo.fecha = this.auxFunctionsService
        .stringToDate(this.appointmentInfo.fecha)

      appointmentInfo.hora = this.auxFunctionsService
        .stringToTime(this.appointmentInfo.hora)

      this.selectedClientID = appointmentInfo.cedulaCliente
      this.formsService.form.patchValue(appointmentInfo)

      const assignedEmployeesFormArray: FormArray = this.formsService
        .form.controls['idEmpleados'] as any

      this.appointmentInfo.idEmpleados.forEach(idEmpleado => {
        assignedEmployeesFormArray.push(new FormControl(idEmpleado))
      })
    }
  }

  getClients = (): Promise<Client[]> => {
    return new Promise((resolve, reject) => {
      this.clientService.getAllClients()
        .subscribe(response => {
          if (response.status == "error") {
            this.messageService.setMessageInfo(response.message!, "error")
          }
          else if (response.clients) {
            resolve(response.clients)
          }
          else {
            console.log(response)
          }
        })
    })
  }

  getEmployees = (): Promise<Employee[]> => {
    return new Promise((resolve, rejectt) => {
      this.employeeService.getAllEmployees()
        .subscribe(response => {
          if (response.status == "error") {
            this.messageService.setMessageInfo(response.message!, "error")
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

  getBranches = (): Promise<Branch[]> => {
    return new Promise((resolve, reject) => {
      this.branchService.getAllBranches()
        .subscribe(response => {
          if (response.status == "error") {
            this.messageService.setMessageInfo(response.message!, "error")
          }
          else if (response.branches) {
            resolve(response.branches)
          }
          else {
            console.log(response)
          }
        })
    })
  }

  getWashingTypes = (): Promise<WashingType[]> => {
    return new Promise((resolve, reject) => {
      this.washingTypeService.getAllWashingTypes()
        .subscribe(response => {
          if (response.status == "error") {
            this.messageService.setMessageInfo(response.message!, "error")
          }
          else if (response.washingTypes) {
            resolve(response.washingTypes)
          }
          else {
            console.log(response)
          }
        })
    })
  }

  setClientIDLabel = () => {
    this.selectedClientID = this.formsService.form
      .controls['cedulaCliente'].value
  }

  setNeededEmployees = () => {
    const washingTypeID = this.formsService.form
      .controls['tipoLavado'].value

    const selectedWashingType = this.washingTypes
      .find((washingType) => washingType.id == washingTypeID)!

    this.neededEmployees = selectedWashingType.cantidadEmpleados

    const assignedEmployees: FormArray = this.formsService
      .form.controls['idEmpleados'] as any

    while (assignedEmployees.value.length > this.neededEmployees) {
      assignedEmployees.removeAt(assignedEmployees.length - 1)
    }
  }

  onSubmit = async () => {
    if (this.appointmentInfo && Object.keys(this.appointmentInfo).length) {
      await this.updateAppointment()
        .then((response: ServerResponse) => {
          if (response.status === 'error') {
            this.messageService.setMessageInfo(response.message!, 'error')
          }
          else {
            if (this.appointmentInfo!.id !== this.formsService.form.value.id) {
              window.location.href =
                `/admin/appointments/${this.formsService.form.value.id}`
            }
            else {
              window.location.reload()
            }
          }
        })
    }
    else {
      await this.createAppointment()
        .then((response) => {
          this.auxFunctionsService.handleResponse(response)
        })
    }
  }

  createAppointment = (): Promise<ServerResponse> => {
    return new Promise((resolve, reject) => {
      const newAppointmentInfo = this.formsService.getFormValue()

      this.appointmentService.createAppointment(newAppointmentInfo)
        .subscribe((response: ServerResponse) => resolve(response))
    })
  }

  updateAppointment = (): Promise<ServerResponse> => {
    return new Promise((resolve, reject) => {
      const newAppointmentInfo = this.formsService.getFormValue()

      this.appointmentService.updateAppointment(this.appointmentInfo!.id, newAppointmentInfo)
        .subscribe((response: ServerResponse) => resolve(response))
    })
  }
}