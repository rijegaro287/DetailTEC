import { Component, OnInit } from '@angular/core'
import { FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms'

import { LoginForm } from 'src/app/Interfaces/Forms'
import { LoginResponse } from 'src/app/Interfaces/ServerResponses'
import { FormsService } from 'src/app/Services/forms.service'

import { LoginService } from 'src/app/Services/login.service'
import { MessageService } from 'src/app/Services/message.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: FormControl
  password: FormControl
  tipoUsuario: FormControl

  constructor(
    private loginService: LoginService,
    protected formsService: FormsService,
    protected messageService: MessageService
  ) {
    this.email = new FormControl('', [Validators.required, Validators.email])
    this.password = new FormControl('', [Validators.required])
    this.tipoUsuario = new FormControl('', [Validators.required])
  }

  ngOnInit(): void {
    this.formsService.resetForm()
    this.messageService.resetMessageInfo()

    this.formsService.form.addControl('email', this.email)
    this.formsService.form.addControl('password', this.password)
    this.formsService.form.addControl('tipoUsuario', this.tipoUsuario)
  }

  onSubmit = () => {
    const validInputs = this.validateInputs()
    if (validInputs) {
      this.logIn().then((response) => {
        if (response.status === 'error') {
          this.messageService.setMessageInfo(response.message!, 'error')
        } else if (response.clientID) {
          window.location.href = `/client/${(response.clientID)}`
        } else {
          window.location.href = '/admin'
        }
      })
    }
  }

  logIn = (): Promise<LoginResponse> => {
    return new Promise((resolve, reject) => {
      const loginInfo: LoginForm = this.formsService.getFormValue()

      this.loginService.postLogin(loginInfo)
        .subscribe((response) => resolve(response))
    })
  }

  validateInputs = (): boolean => {
    if (this.email.errors) {
      this.showEmailErrors(this.email.errors)
      return false
    }
    else if (this.password.errors) {
      this.showPasswordErrors()
      return false
    }
    else {
      return true
    }
  }

  showEmailErrors = (errors: ValidationErrors) => {
    if (errors['required']) {
      this.messageService.setMessageInfo('Introduzca una dirección de correo electrónico', 'error')
    }
    else if (errors['email']) {
      this.messageService.setMessageInfo('Dirección de correo electrónico inválida', 'error')
    }
  }

  showPasswordErrors = () => {
    this.messageService.setMessageInfo('Introduzca su contraseña', 'error')
  }
}