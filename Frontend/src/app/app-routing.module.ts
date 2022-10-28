import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { LoginComponent } from './Components/login/login.component'

/* Admin */
import { AdminMainComponent } from './Components/Admin/main/main.component'
import { AdminEmployeesComponent } from './Components/Admin/employees/employees.component'
import { AdminEmployeeInfoComponent } from './Components/Admin/employee-info/employee-info.component'
import { AdminClientsComponent } from './Components/Admin/clients/clients.component'
import { AdminClientInfoComponent } from './Components/Admin/client-info/client-info.component'
import { AdminBranchesComponent } from './Components/Admin/branches/branches.component'
import { AdminBranchInfoComponent } from './Components/Admin/branch-info/branch-info.component'
import { AdminSuppliersComponent } from './Components/Admin/suppliers/suppliers.component'
import { AdminSupplierInfoComponent } from './Components/Admin/supplier-info/supplier-info.component'
import { AdminProductsComponent } from './Components/Admin/products/products.component'
import { AdminProductInfoComponent } from './Components/Admin/product-info/product-info.component'
import { AdminWashingTypesComponent } from './Components/Admin/washing-types/washing-types.component'
import { AdminWashingTypeInfoComponent } from './Components/Admin/washing-type-info/washing-type-info.component'
import { AdminAppointmentsComponent } from './Components/Admin/appointments/appointments.component'
import { AdminAppointmentInfoComponent } from './Components/Admin/appointment-info/appointment-info.component'
import { AdminBillsComponent } from './Components/Admin/bills/bills.component'

/* Client */
import { ClientMainComponent } from './Components/Client/main/main.component'
import { ClientInfoComponent } from './Components/Client/client-info/client-info.component'
import { ClientBillsComponent } from './Components/Client/bills/bills.component'
import { ClientBillInfoComponent } from './Components/Client/bill-info/bill-info.component'
import { ClientAppointmentsComponent } from './Components/Client/appointments/appointments.component'
import { ClientAppointmentInfoComponent } from './Components/Client/appointment-info/appointment-info.component'
import { ReportsComponent } from './Components/Admin/reports/reports.component'

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    component: AdminMainComponent,
    children: [
      { path: '', redirectTo: 'employees', pathMatch: 'full' },
      { path: 'employees', component: AdminEmployeesComponent },
      { path: 'employees/:id', component: AdminEmployeeInfoComponent },
      { path: 'clients', component: AdminClientsComponent },
      { path: 'clients/:id', component: AdminClientInfoComponent },
      { path: 'appointments', component: AdminAppointmentsComponent },
      { path: 'appointments/:id', component: AdminAppointmentInfoComponent },
      { path: 'branches', component: AdminBranchesComponent },
      { path: 'branches/:id', component: AdminBranchInfoComponent },
      { path: 'washing_types', component: AdminWashingTypesComponent },
      { path: 'washing_types/:id', component: AdminWashingTypeInfoComponent },
      { path: 'suppliers', component: AdminSuppliersComponent },
      { path: 'suppliers/:id', component: AdminSupplierInfoComponent },
      { path: 'products', component: AdminProductsComponent },
      { path: 'products/:id', component: AdminProductInfoComponent },
      { path: 'bills', component: AdminBillsComponent },
      { path: 'reports', component: ReportsComponent }
    ]
  },
  {
    path: 'client/:clientID',
    component: ClientMainComponent,
    children: [
      { path: 'info', component: ClientInfoComponent },
      { path: 'appointments', component: ClientAppointmentsComponent },
      { path: 'appointments/:id', component: ClientAppointmentInfoComponent },
      { path: 'bills', component: ClientBillsComponent },
      { path: 'bills/:id', component: ClientBillInfoComponent }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
