import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'

/* Componentes Generales */
import { LoginComponent } from './Components/login/login.component'
import { MessageComponent } from './Components/message/message.component'
import { NavbarComponent } from './Components/navbar/navbar.component'
import { GenericTableComponent } from './Components/generic-table/generic-table.component'

/* Componentes de administrador */
import { AdminMainComponent } from './Components/Admin/main/main.component'
import { AdminEmployeesComponent } from './Components/Admin/employees/employees.component'
import { AdminBranchesComponent } from './Components/Admin/branches/branches.component'
import { AdminEmployeeInfoComponent } from './Components/Admin/employee-info/employee-info.component'
import { AdminClientsComponent } from './Components/Admin/clients/clients.component';
import { AdminClientInfoComponent } from './Components/Admin/client-info/client-info.component';

/* Componentes de cliente */
import { HomeComponent } from './Components/Client/home/home.component'
import { MakeAppointmentComponent } from './Components/Client/make-appointment/make-appointment.component'
import { BillsComponent } from './Components/Client/bills/bills.component'
import { InfoCardComponent } from './Components/info-card/info-card.component'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { ModalComponent } from './Components/modal/modal.component';
import { AddEmployeeFormComponent } from './Components/Admin/add-employee-form/add-employee-form.component';
import { AddClientFormComponent } from './Components/Admin/add-client-form/add-client-form.component';
import { MultivaluedInputComponent } from './Components/multivalued-input/multivalued-input.component'
import { BillInfoComponent } from './Components/Client/bill-info/bill-info.component';
import { AddBranchFormComponent } from './Components/Admin/add-branch-form/add-branch-form.component';
import { AdminBranchInfoComponent } from './Components/Admin/branch-info/branch-info.component'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MessageComponent,
    NavbarComponent,
    AdminMainComponent,
    AdminEmployeesComponent,
    AdminBranchesComponent,
    HomeComponent,
    MakeAppointmentComponent,
    BillsComponent,
    GenericTableComponent,
    InfoCardComponent,
    AdminEmployeeInfoComponent,
    ModalComponent,
    AddEmployeeFormComponent,
    AdminClientsComponent,
    AddClientFormComponent,
    AdminClientInfoComponent,
    MultivaluedInputComponent,
    BillInfoComponent,
    AddBranchFormComponent,
    AdminBranchInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
