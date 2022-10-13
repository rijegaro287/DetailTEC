import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormsService {
  form: FormGroup

  constructor() { this.form = new FormGroup({}) }

  resetForm = () => { this.form = new FormGroup({}) }

  getFormValue = () => this.form.value

  patchFormValue = (value: any) => this.form.patchValue(value)

  setFormValue = (value: any) => this.form.setValue(value)

  printFormValue = () => console.log(this.form.value)
}
