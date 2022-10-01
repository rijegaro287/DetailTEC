import { Component, OnInit } from '@angular/core';
import { Branch } from 'src/app/Interfaces/branch';
import { WashingType } from 'src/app/Interfaces/washing-type';

@Component({
  selector: 'app-make-appointment',
  templateUrl: './make-appointment.component.html',
  styleUrls: ['./make-appointment.component.sass']
})
export class MakeAppointmentComponent implements OnInit {
  client = "";
  vehicle = "";
  branch = "";
  washingType = "";
  branchesToShow: Branch[] = [];
  typesOFWahingToShow: WashingType[] = [];
  rappointmentResult:boolean = false;

  constructor() { }

  
  ngOnInit(): void {
  }
  
  
  makeAppointment() {
    console.log("Make appointment");
  }
}
