import { Component, OnInit } from '@angular/core'
import { FormGroup, FormControl } from '@angular/forms'

import { LoginService } from 'src/app/Services/login.service'

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
  }

  loginForm: FormGroup = new FormGroup({
    emailInput: new FormControl(''),
    passwordInput: new FormControl('')
  })

  onSubmit = () => {
    const loginInfo = this.loginForm.value
    this.loginService.postLogin(loginInfo)
      .subscribe(response => {
        if (response.status === 'error') alert(response.body)
        else console.log(response.status)
      })
  }
}
