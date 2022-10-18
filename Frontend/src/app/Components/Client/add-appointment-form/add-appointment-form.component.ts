import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { Appointment } from 'src/app/Interfaces/Appointment';
import { Branch } from 'src/app/Interfaces/Branch';
import { WashingType } from 'src/app/Interfaces/WashingType';

import { AuxFunctionsService } from 'src/app/Services/aux-functions.service';
import { BranchService } from 'src/app/Services/branch.service';
import { WashingTypeService } from 'src/app/Services/washing-type.service';
import { FormsService } from 'src/app/Services/forms.service';
import { MessageService } from 'src/app/Services/message.service';

@Component({
  selector: 'app-add-appointment-form',
  templateUrl: './add-appointment-form.component.html',
  styleUrls: ['./add-appointment-form.component.scss']
})
export class AddAppointmentFormComponent implements OnInit {
  [x: string]: any;
  id: FormControl;
  clientId: FormControl;
  licensePlate: FormControl;
  branch: FormControl;
  typeOfWash: FormControl;
  date: FormControl;
  // time:FormControl;

  @Input() appointmentInfo?: Appointment;
  branches: Branch[];
  typeOfWashes: WashingType[];

  constructor(
    private auxFunctionsService: AuxFunctionsService,
    private branchService: BranchService,
    private washingTypeService: WashingTypeService,
    private messageService: MessageService,
    protected formsService: FormsService
    ) { 
    this.id = new FormControl('', [Validators.required]);
    this.clientId = new FormControl('', [Validators.required]);
    this.licensePlate = new FormControl('', [Validators.required]);
    this.branch = new FormControl('', [Validators.required]);
    this.typeOfWash = new FormControl('', [Validators.required]);
    this.date = new FormControl('', [Validators.required]);

    this.branches = this.getBranches();
    this.typeOfWashes = this.getWashingType();
  }

  
  ngOnInit(): void {
    this.formsService.resetForm()

    this.formsService.form.addControl('id', this.id)
    this.formsService.form.addControl('clientId', this.clientId)
    this.formsService.form.addControl('licensePlate', this.licensePlate)
    this.formsService.form.addControl('branch', this.branch)
    this.formsService.form.addControl('typeOfWash', this.typeOfWash)
    this.formsService.form.addControl('date', this.date);

    if(this.appointmentInfo){
      const {id, ...appointmentInfo} = this.appointmentInfo as any;

      appointmentInfo.date = this.auxFunctionsService
      .stringToDate(this.appointmentInfo.date);

      this.formsService.patchFormValue(appointmentInfo);

      this.formsService.form.controls["branch"]
        .setValue(this.appointmentInfo.branchId)

      this.formsService.form.controls["typeOfWash"]
        .setValue(this.appointmentInfo.typeOfWash)
    }
  }

  getBranches = (): Branch[] => {
    let branches: Branch[] = [];

    this.branchService.getAllBranches()
    .subscribe(response => {
      if(response.status == "error"){
        this.messageService.setMessageInfo(response.message!, "error")
      }
      else if(response.branches){
        branches = response.branches
      }
      else{
        console.log(response)
      }
    })
    return branches
  }
  
  getWashingType = (): WashingType[] => {
    let typeOfWashes: WashingType[] = [];

    this.washingTypeService.getAllWashingTypes()
      .subscribe(response => {
        if(response.status == "error"){
          this.messageService.setMessageInfo(response.message!, "error")
        }
        else if(response.washingTypes){
          typeOfWashes = response.washingTypes;
        }
        else{
          console.log(response)
        }
      })
      return typeOfWashes;
  }

  onSubmit(){
    this.formsService.printFormValue();
  }
}
