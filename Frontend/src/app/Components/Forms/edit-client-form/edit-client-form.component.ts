import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormArray, Validators } from '@angular/forms';

import { Client } from 'src/app/Interfaces/Client';
import { ServerResponse } from 'src/app/Interfaces/ServerResponses';

import { AuxFunctionsService } from 'src/app/Services/aux-functions.service';
import { ClientService } from 'src/app/Services/client.service';
import { FormsService } from 'src/app/Services/forms.service';
import { MessageService } from 'src/app/Services/message.service';

@Component({
  selector: 'app-edit-client-form',
  templateUrl: './edit-client-form.component.html',
  styleUrls: ['./edit-client-form.component.scss']
})
export class EditClientFormComponent implements OnInit {
  nombre: FormControl
  apellido1: FormControl
  apellido2: FormControl
  id: FormControl
  email: FormControl
  telefonos: FormArray
  direcciones: FormArray
  passwordVieja: FormControl
  password: FormControl
  passwordConfirm: FormControl

  @Input() clientInfo?: Client

  constructor(
    private clientService: ClientService,
    private messageService: MessageService,
    protected formsService: FormsService
  ) {
    this.nombre = new FormControl('', [Validators.required])
    this.apellido1 = new FormControl('', [Validators.required])
    this.apellido2 = new FormControl('', [Validators.required])
    this.id = new FormControl('', [Validators.required])
    this.email = new FormControl('', [Validators.required, Validators.email])
    this.telefonos = new FormArray([new FormControl('')], [Validators.required])
    this.direcciones = new FormArray([new FormControl('')], [Validators.required])
    this.passwordVieja = new FormControl('', [Validators.required])
    this.password = new FormControl('', [Validators.required])
    this.passwordConfirm = new FormControl('', [Validators.required])
  }

  ngOnInit(): void {
    this.formsService.resetForm()

    this.formsService.form.addControl('nombre', this.nombre)
    this.formsService.form.addControl('apellido1', this.apellido1)
    this.formsService.form.addControl('apellido2', this.apellido2)
    this.formsService.form.addControl('id', this.id)
    this.formsService.form.addControl('email', this.email)
    this.formsService.form.addControl('telefonos', this.telefonos)
    this.formsService.form.addControl('direcciones', this.direcciones)
    this.formsService.form.addControl('passwordVieja', this.passwordVieja)
    this.formsService.form.addControl('password', this.password)
    this.formsService.form.addControl('passwordConfirm', this.passwordConfirm)
  }

  ngOnChanges(): void {
    if (this.clientInfo && Object.keys(this.clientInfo).length) {
      const { total, utilizados, actuales, ...clientInfo } = this.clientInfo

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

  onSubmit = async () => {
    const newClientInfo = this.formsService.getFormValue()

    if (newClientInfo.password !== newClientInfo.passwordConfirm) {
      this.messageService.setMessageInfo('Las contraseñas no coinciden', 'error')
      return
    } else {
      this.messageService.resetMessageInfo()
      delete newClientInfo.passwordConfirm
    }

    if (this.clientInfo && Object.keys(this.clientInfo).length) {
      await this.updateClient(newClientInfo)
        .then((response: ServerResponse) => {
          if (response.status === 'error') {
            this.messageService.setMessageInfo(response.message!, 'error')
          }
          else {
            if (this.clientInfo!.id !== this.formsService.form.value.id) {
              window.location.href =
                `/admin/clients/${this.formsService.form.value.id}`
            }
            else {
              window.location.reload()
            }
          }
        })
    }
  }

  updateClient = (newClientInfo: Client): Promise<ServerResponse> => {
    return new Promise((resolve, reject) => {
      this.clientService.updateClient(this.clientInfo!.id, newClientInfo)
        .subscribe((response: ServerResponse) => resolve(response))
    })
  }
}
