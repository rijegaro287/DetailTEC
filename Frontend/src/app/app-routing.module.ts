import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

/* Generales */
import { LoginComponent } from './Components/login/login.component'

/* Admin */
import { AdminMainComponent } from './Components/Admin/main/main.component'
import { AdminEmployeesComponent } from './Components/Admin/employees/employees.component'
import { AdminEmployeeInfoComponent } from './Components/Admin/employee-info/employee-info.component'
import { AdminClientsComponent } from './Components/Admin/clients/clients.component'
import { AdminClientInfoComponent } from './Components/Admin/client-info/client-info.component'
import { AdminBranchesComponent } from './Components/Admin/branches/branches.component'
import { AdminBranchInfoComponent } from './Components/Admin/branch-info/branch-info.component'

/* Client */
import { HomeComponent } from './Components/Client/home/home.component'
import { MakeAppointmentComponent } from './Components/Client/make-appointment/make-appointment.component'
import { BillsComponent } from './Components/Client/bills/bills.component'
import { BillInfoComponent } from './Components/Client/bill-info/bill-info.component'

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
      { path: 'branches', component: AdminBranchesComponent },
      { path: 'branches/:name', component: AdminBranchInfoComponent },
    ]
  },
  {
    path: "client",
    component: HomeComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'make_appointment', component: MakeAppointmentComponent },
      { path: 'bills', component: BillsComponent },
      { path: "bills/:id", component: BillInfoComponent }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
