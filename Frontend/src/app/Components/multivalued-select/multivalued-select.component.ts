import { Component, Input, OnInit } from '@angular/core'
import { FormArray, Validators, FormControl } from '@angular/forms'

import { SelectOption } from 'src/app/Interfaces/Auxiliaries'

import { FormsService } from 'src/app/Services/forms.service'

@Component({
  selector: 'app-multivalued-select',
  templateUrl: './multivalued-select.component.html',
  styleUrls: ['./multivalued-select.component.scss']
})
export class MultivaluedSelectComponent implements OnInit {
  @Input() label: string
  @Input() inputName: string
  @Input() options: SelectOption[]
  @Input() optionsState: SelectOption[]
  @Input() onChangeCallback: () => void

  formArray: FormArray

  constructor(protected formsService: FormsService) {
    this.label = ''
    this.inputName = ''
    this.options = []
    this.optionsState = []
    this.onChangeCallback = () => { }

    this.formArray = new FormArray([], [Validators.required]) as any
  }

  ngOnInit(): void {
    this.options.forEach(option => {
      option.disabled = false
      return option
    })

    this.optionsState = structuredClone(this.options)
    this.formArray = this.formsService.form.controls[this.inputName] as any

    this.onChange()
  }

  addElement = () => { this.formArray.push(new FormControl('')) }

  deleteElement = (index: number) => {
    if (this.formArray.length > 1) {
      this.formArray.removeAt(index)
      this.onChange()
    }
  }

  onChange = () => {
    const selectedOptions: string[] = this.formArray.value
    this.optionsState = structuredClone(this.options)

    selectedOptions.forEach(selectedOption => {
      this.optionsState.forEach(option => {
        if (selectedOption === option.value) {
          option.disabled = true
        }
      })
    })

    this.onChangeCallback()
  }
}
