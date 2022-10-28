import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { AppComponent } from './app.component'
import { AppRoutingModule } from './app-routing.module'

/* Componentes Generales */
import { LoginComponent } from './Components/login/login.component'
import { MessageComponent } from './Components/message/message.component'
import { NavbarComponent } from './Components/navbar/navbar.component'
import { InfoCardComponent } from './Components/info-card/info-card.component'
import { GenericTableComponent } from './Components/generic-table/generic-table.component'
import { ModalComponent } from './Components/modal/modal.component';
import { MultivaluedInputComponent } from './Components/multivalued-input/multivalued-input.component'
import { MultivaluedSelectComponent } from './Components/multivalued-select/multivalued-select.component';

/* Componentes de administrador */
import { AdminMainComponent } from './Components/Admin/main/main.component'
import { AdminEmployeesComponent } from './Components/Admin/employees/employees.component'
import { AdminEmployeeInfoComponent } from './Components/Admin/employee-info/employee-info.component'
import { AdminBranchesComponent } from './Components/Admin/branches/branches.component'
import { AdminBranchInfoComponent } from './Components/Admin/branch-info/branch-info.component';
import { AdminClientsComponent } from './Components/Admin/clients/clients.component';
import { AdminClientInfoComponent } from './Components/Admin/client-info/client-info.component';
import { AdminSuppliersComponent } from './Components/Admin/suppliers/suppliers.component';
import { AdminSupplierInfoComponent } from './Components/Admin/supplier-info/supplier-info.component';
import { AdminProductsComponent } from './Components/Admin/products/products.component';
import { AdminProductInfoComponent } from './Components/Admin/product-info/product-info.component'
import { AdminWashingTypesComponent } from './Components/Admin/washing-types/washing-types.component';
import { AdminWashingTypeInfoComponent } from './Components/Admin/washing-type-info/washing-type-info.component';

/* Componentes de cliente */
import { ClientMainComponent } from './Components/Client/main/main.component'
import { ClientInfoComponent } from './Components/Client/client-info/client-info.component'
import { ClientBillsComponent } from './Components/Client/bills/bills.component'
import { ClientAppointmentsComponent } from './Components/Client/appointments/appointments.component';
import { ClientAppointmentInfoComponent } from './Components/Client/appointment-info/appointment-info.component';

/* Formularios */
import { AddEmployeeFormComponent } from './Components/Forms/add-employee-form/add-employee-form.component';
import { AddClientFormComponent } from './Components/Forms/add-client-form/add-client-form.component';
import { AddBranchFormComponent } from './Components/Forms/add-branch-form/add-branch-form.component';
import { AddSupplierFormComponent } from './Components/Forms/add-supplier-form/add-supplier-form.component';
import { AddProductFormComponent } from './Components/Forms/add-product-form/add-product-form.component';
import { ClientAddAppointmentFormComponent } from './Components/Forms/client-add-appointment-form/client-add-appointment-form.component';
import { AddWashingTypeFormComponent } from './Components/Forms/add-washing-type-form/add-washing-type-form.component';
import { AdminAppointmentsComponent } from './Components/Admin/appointments/appointments.component';
import { AdminAddAppointmentFormComponent } from './Components/Forms/admin-add-appointment-form/admin-add-appointment-form.component';
import { AdminAppointmentInfoComponent } from './Components/Admin/appointment-info/appointment-info.component';
import { AdminBillsComponent } from './Components/Admin/bills/bills.component';
import { EditEmployeeFormComponent } from './Components/Forms/edit-employee-form/edit-employee-form.component';
import { ReportsComponent } from './Components/Admin/reports/reports.component';
import { EditClientFormComponent } from './Components/Forms/edit-client-form/edit-client-form.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MessageComponent,
    NavbarComponent,
    AdminMainComponent,
    AdminEmployeesComponent,
    AdminBranchesComponent,
    AdminEmployeeInfoComponent,
    AdminClientsComponent,
    AdminClientInfoComponent,
    AdminBranchInfoComponent,
    AdminSuppliersComponent,
    AdminSupplierInfoComponent,
    AdminProductsComponent,
    AdminProductInfoComponent,
    ClientMainComponent,
    ClientBillsComponent,
    GenericTableComponent,
    InfoCardComponent,
    ModalComponent,
    AddEmployeeFormComponent,
    AddClientFormComponent,
    MultivaluedInputComponent,
    AddBranchFormComponent,
    AddSupplierFormComponent,
    AddProductFormComponent,
    AdminWashingTypesComponent,
    AdminWashingTypeInfoComponent,
    AddWashingTypeFormComponent,
    MultivaluedSelectComponent,
    ClientAddAppointmentFormComponent,
    ClientAppointmentsComponent,
    ClientAppointmentInfoComponent,
    ClientInfoComponent,
    AdminAppointmentsComponent,
    AdminAddAppointmentFormComponent,
    AdminAppointmentInfoComponent,
    AdminBillsComponent,
    EditEmployeeFormComponent,
    ReportsComponent,
    EditClientFormComponent
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
