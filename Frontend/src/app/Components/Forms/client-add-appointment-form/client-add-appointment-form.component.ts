import { Component, Input, OnInit } from '@angular/core'
import { FormControl, Validators } from '@angular/forms'

import { Branch } from 'src/app/Interfaces/Branch'
import { WashingType } from 'src/app/Interfaces/WashingType'

import { AuxFunctionsService } from 'src/app/Services/aux-functions.service'
import { BranchService } from 'src/app/Services/branch.service'
import { WashingTypeService } from 'src/app/Services/washing-type.service'
import { FormsService } from 'src/app/Services/forms.service'
import { MessageService } from 'src/app/Services/message.service'

@Component({
  selector: 'app-client-add-appointment-form',
  templateUrl: './client-add-appointment-form.component.html',
  styleUrls: ['./client-add-appointment-form.component.scss']
})
export class ClientAddAppointmentFormComponent implements OnInit {
  licensePlate: FormControl
  washingType: FormControl
  branch: FormControl
  date: FormControl
  time: FormControl

  branches: Branch[]
  washingTypes: WashingType[]

  constructor(
    private branchService: BranchService,
    private washingTypeService: WashingTypeService,
    private messageService: MessageService,
    protected formsService: FormsService
  ) {
    this.licensePlate = new FormControl('', [Validators.required])
    this.washingType = new FormControl('', [Validators.required])
    this.branch = new FormControl('', [Validators.required])
    this.date = new FormControl('', [Validators.required])
    this.time = new FormControl('', [Validators.required])

    this.branches = []
    this.washingTypes = []
  }

  ngOnInit(): void {
    this.formsService.resetForm()

    this.branches = this.getBranches()
    this.washingTypes = this.getWashingTypes()

    this.formsService.form.addControl('licensePlate', this.licensePlate)
    this.formsService.form.addControl('branch', this.branch)
    this.formsService.form.addControl('washingType', this.washingType)
    this.formsService.form.addControl('date', this.date)
    this.formsService.form.addControl('time', this.time)
  }

  getBranches = (): Branch[] => {
    let branches: Branch[] = []

    // this.branchService.getAllBranches()
    //   .subscribe(response => {
    //     if (response.status == "error") {
    //       this.messageService.setMessageInfo(response.message!, "error")
    //     }
    //     else if (response.branches) {
    //       branches = response.branches
    //     }
    //     else {
    //       console.log(response)
    //     }
    //   })

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

  onSubmit() {
    this.formsService.printFormValue()
  }
}
