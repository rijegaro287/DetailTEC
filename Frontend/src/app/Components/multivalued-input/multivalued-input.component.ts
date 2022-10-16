import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { FormsService } from 'src/app/Services/forms.service';

@Component({
  selector: 'app-multivalued-input',
  templateUrl: './multivalued-input.component.html',
  styleUrls: ['./multivalued-input.component.scss']
})
export class MultivaluedInputComponent implements OnInit {
  @Input() label: string
  @Input() inputName: string
  @Input() inputType: string

  formArray: FormArray

  constructor(protected formsService: FormsService) {
    this.label = ''
    this.inputName = ''
    this.inputType = 'text'

    this.formArray = new FormArray([], [Validators.required]) as any
  }

  ngOnInit(): void {
    this.formArray = this.formsService.form.controls[this.inputName] as any
  }

  addElement = () => { this.formArray.push(new FormControl('')) }

  deleteElement = (index: number) => {
    if (this.formArray.length > 1) {
      this.formArray.removeAt(index)
    }
  }
}
