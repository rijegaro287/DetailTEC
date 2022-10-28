import { Component, OnInit } from '@angular/core'
import { FormArray, FormControl, Validators } from '@angular/forms'
import { Location } from '@angular/common';

import { Branch } from 'src/app/Interfaces/Branch'
import { WashingType } from 'src/app/Interfaces/WashingType'

import { AuxFunctionsService } from 'src/app/Services/aux-functions.service'
import { BranchService } from 'src/app/Services/branch.service'
import { WashingTypeService } from 'src/app/Services/washing-type.service'
import { FormsService } from 'src/app/Services/forms.service'
import { MessageService } from 'src/app/Services/message.service'
import { Client } from 'src/app/Interfaces/Client'
import { ServerResponse } from 'src/app/Interfaces/ServerResponses'
import { AppointmentsService } from 'src/app/Services/appointments.service'
import { ClientService } from 'src/app/Services/client.service'

@Component({
  selector: 'app-client-add-appointment-form',
  templateUrl: './client-add-appointment-form.component.html',
  styleUrls: ['./client-add-appointment-form.component.scss']
})
export class ClientAddAppointmentFormComponent implements OnInit {
  id: FormControl
  clientID: FormControl
  licensePlate: FormControl
  washingType: FormControl
  branch: FormControl
  date: FormControl
  time: FormControl
  paymentMethod: FormControl
  assignedEmployees: FormArray

  branches: Branch[]
  washingTypes: WashingType[]

  constructor(
    private location: Location,
    private clientService: ClientService,
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

    this.branches = []
    this.washingTypes = []
  }

  async ngOnInit(): Promise<void> {
    this.formsService.resetForm()

    this.formsService.form.addControl('id', this.id)
    this.formsService.form.addControl('placaVehiculo', this.licensePlate)
    this.formsService.form.addControl('idSucursal', this.branch)
    this.formsService.form.addControl('tipoLavado', this.washingType)
    this.formsService.form.addControl('fecha', this.date)
    this.formsService.form.addControl('hora', this.time)
    this.formsService.form.addControl('medioPago', this.paymentMethod)

    await this.getBranches()
      .then((branches) => { this.branches = branches })

    await this.getWashingTypes()
      .then((washingTypes) => { this.washingTypes = washingTypes })
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

  onSubmit = async () => {
    await this.createAppointment()
      .then((response) => {
        this.auxFunctionsService.handleResponse(response)
      })
  }

  createAppointment = (): Promise<ServerResponse> => {
    return new Promise((resolve, reject) => {
      const state = this.location.getState() as any
      const clientID = state.clientID

      const newAppointmentInfo = this.formsService.getFormValue()
      newAppointmentInfo.cedulaCliente = clientID

      this.appointmentService.createAppointment(newAppointmentInfo)
        .subscribe((response: ServerResponse) => resolve(response))
    })
  }
}
