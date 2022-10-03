import { Component, OnInit } from '@angular/core';
import { Branch } from 'src/app/Interfaces/branch';
import { WashingType } from 'src/app/Interfaces/washing-type';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-make-appointment',
  templateUrl: './make-appointment.component.html',
  styleUrls: ['./make-appointment.component.sass']
})
export class MakeAppointmentComponent implements OnInit {
  
  appointmentForm:FormGroup = new FormGroup({
    client: new FormControl(),
    vehicle: new FormControl(),
    branch: new FormControl(),
    washingType: new FormControl()
  });

  constructor() { }

  
  ngOnInit(): void {
  }
  
  onSubmit(){
    console.log(this.appointmentForm.value);
  }
}
