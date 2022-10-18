import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { FormsService } from 'src/app/Services/forms.service';

@Component({
  selector: 'app-make-appointment',
  templateUrl: './make-appointment.component.html',
  styleUrls: ['./make-appointment.component.scss']
})
// TODO: Agregar la hora de la cita, mostrar las sucursales.
export class MakeAppointmentComponent implements OnInit {
  id: FormControl;
  clientId: FormControl;
  licensePlate: FormControl;
  branch: FormControl;
  typeOfWash: FormControl;
  date: FormControl;
  // time:FormControl;


  constructor(protected formsService: FormsService) {
    this.id = new FormControl('', [Validators.required]);
    this.clientId = new FormControl('', [Validators.required]);
    this.licensePlate = new FormControl('', [Validators.required]);
    this.branch = new FormControl('', [Validators.required]);
    this.typeOfWash = new FormControl('', [Validators.required]);
    this.date = new FormControl('', [Validators.required]);
  }


  ngOnInit(): void {
    this.formsService.resetForm()

    this.formsService.form.addControl('id', this.id)
    this.formsService.form.addControl('clientId', this.clientId)
    this.formsService.form.addControl('licensePlate', this.licensePlate)
    this.formsService.form.addControl('branch', this.branch)
    this.formsService.form.addControl('typeOfWash', this.typeOfWash)
    this.formsService.form.addControl('date', this.date);
  }

  onSubmit() {
    this.formsService.printFormValue();
  }
}
