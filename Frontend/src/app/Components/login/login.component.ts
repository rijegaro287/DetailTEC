import { Component, OnInit } from '@angular/core'
import { FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms'

import { LoginForm } from 'src/app/Interfaces/LoginForm'

import { LoginService } from 'src/app/Services/login.service'
import { MessageService } from 'src/app/Services/message.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(
    private loginService: LoginService,
    protected messageService: MessageService
  ) { }

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  get email() { return this.loginForm.get('email') }
  get password() { return this.loginForm.get('password') }

  onSubmit = () => {
    const validInputs = this.validateInputs()
    if (validInputs) {
      const loginInfo: LoginForm = this.loginForm.value

      this.loginService.postLogin(loginInfo)
        .subscribe(response => {
          if (response.status === 'error') {
            this.messageService.setMessageInfo(response.body!, 'error')
          }
          else {
            console.log(`status: ${response.status}`, `body: ${response.body}`)
          }
        })
    }
  }

  validateInputs = (): boolean => {
    if (this.email?.errors) {
      this.showEmailErrors(this.email.errors)
      return false
    }
    else if (this.password?.errors) {
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

  ngOnInit(): void {
    this.loginForm.reset()
    this.messageService.resetMessageInfo()
  }
}