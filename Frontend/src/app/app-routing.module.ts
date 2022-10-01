import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { MakeAppointmentComponent } from './Components/make-appointment/make-appointment.component';
import { BillsComponent } from './Components/bills/bills.component';

import { LoginFormComponent } from './Components/login-form/login-form.component'
import { AdminMainComponent } from './Components/admin-main/admin-main.component'
import { EmployeesComponent } from './Components/employees/employees.component'
import { BranchesComponent } from './Components/branches/branches.component'


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginFormComponent },
  { path: 'admin', component: AdminMainComponent },
  { path: 'admin/employees', component: EmployeesComponent },
  { path: 'admin/branches', component: BranchesComponent },
  { path: 'client_home', component: HomeComponent},
  { path: 'make_appointment', component: MakeAppointmentComponent},
  { path: 'bills', component: BillsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
