import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { MakeAppointmentComponent } from './Components/make-appointment/make-appointment.component';
import { BillsComponent } from './Components/bills/bills.component';

import { LoginFormComponent } from './Components/login-form/login-form.component'

const routes: Routes = [
  { path: "", redirectTo: "client_home", pathMatch: "full" },
  { path: 'client_home', component: HomeComponent},
  { path: 'make_appointment', component: MakeAppointmentComponent},
  { path: 'bills', component: BillsComponent}
];

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginFormComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
