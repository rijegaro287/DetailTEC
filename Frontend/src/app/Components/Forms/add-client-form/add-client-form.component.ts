import { Component, Input, OnInit } from '@angular/core'
import { FormArray, FormControl, Validators } from '@angular/forms'

import { FormsService } from 'src/app/Services/forms.service'

import { Client } from 'src/app/Interfaces/Client'

@Component({
  selector: 'app-add-client-form',
  templateUrl: './add-client-form.component.html',
  styleUrls: ['./add-client-form.component.scss']
})
export class AddClientFormComponent implements OnInit {
  nombre: FormControl
  apellido: FormControl
  usuario: FormControl
  id: FormControl
  email: FormControl
  telefonos: FormArray
  direcciones: FormArray

  @Input() clientInfo?: Client

  constructor(
    protected formsService: FormsService
  ) {
    this.nombre = new FormControl('', [Validators.required])
    this.apellido = new FormControl('', [Validators.required])
    this.usuario = new FormControl('', [Validators.required])
    this.id = new FormControl('', [Validators.required])
    this.email = new FormControl('', [Validators.required, Validators.email])
    this.telefonos = new FormArray([new FormControl('')], [Validators.required])
    this.direcciones = new FormArray([new FormControl('')], [Validators.required])
  }

  ngOnInit(): void {
    this.formsService.resetForm()

    this.formsService.form.addControl('nombre', this.nombre)
    this.formsService.form.addControl('apellido', this.apellido)
    this.formsService.form.addControl('usuario', this.usuario)
    this.formsService.form.addControl('id', this.id)
    this.formsService.form.addControl('email', this.email)
    this.formsService.form.addControl('telefonos', this.telefonos)
    this.formsService.form.addControl('direcciones', this.direcciones)

    if (this.clientInfo) {
      const { puntos, ...clientInfo } = this.clientInfo

      clientInfo.id = Number(clientInfo.id)


      this.formsService.patchFormValue(clientInfo)

      const telFormArray: FormArray = this.formsService
        .form.controls['telefonos'] as any

      const addressFormArray: FormArray = this.formsService
        .form.controls['direcciones'] as any

      telFormArray.removeAt(0)
      addressFormArray.removeAt(0)

      clientInfo.telefonos.forEach(tel => {
        telFormArray.push(new FormControl(tel))
      })

      clientInfo.direcciones.forEach(tel => {
        addressFormArray.push(new FormControl(tel))
      })
    }
  }

  onSubmit = () => {
    if (this.clientInfo) {
      // Modify employee info
    } else {
      // Add new employee
    }
    this.formsService.printFormValue()
  }
}
