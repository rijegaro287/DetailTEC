import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'

import { LoginFormComponent } from './Components/login-form/login-form.component';
import { MessageComponent } from './Components/message/message.component';

import { EmployeesComponent } from './Components/employees/employees.component';
import { BranchesComponent } from './Components/branches/branches.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { AdminMainComponent } from './Components/admin-main/admin-main.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    MessageComponent,
    AdminMainComponent,
    NavbarComponent,
    EmployeesComponent,
    BranchesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
