import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {TableModule} from 'primeng/table';

/* Componentes Generales */
import { LoginComponent } from './Components/login/login.component';
import { MessageComponent } from './Components/message/message.component';
import { NavbarComponent } from './Components/navbar/navbar.component';

/* Componentes de administrador */
import { AdminMainComponent } from './Components/Admin/main/main.component';
import { AdminEmployeesComponent } from './Components/Admin/employees/employees.component';
import { AdminBranchesComponent } from './Components/Admin/branches/branches.component';

/* Componentes de cliente */
import { HomeComponent } from './Components/Client/home/home.component';
import { MakeAppointmentComponent } from './Components/Client/make-appointment/make-appointment.component';
import { BillsComponent } from './Components/Client/bills/bills.component';
import { GenericTableComponent } from './Components/generic-table/generic-table.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    TableModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
