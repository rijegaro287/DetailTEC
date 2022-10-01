import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { ReactiveFormsModule } from '@angular/forms'
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginFormComponent } from './Components/login-form/login-form.component';
import { MessageComponent } from './Components/message/message.component';

import { AdminMainComponent } from './Components/admin-main/admin-main.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { EmployeesComponent } from './Components/employees/employees.component';
import { BranchesComponent } from './Components/branches/branches.component';

import { HomeComponent } from './Components/home/home.component';
import { MakeAppointmentComponent } from './Components/make-appointment/make-appointment.component';
import { BillsComponent } from './Components/bills/bills.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginFormComponent,
    MessageComponent,
    AdminMainComponent,
    NavbarComponent,
    EmployeesComponent,
    BranchesComponent,
    MakeAppointmentComponent,
    BillsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
