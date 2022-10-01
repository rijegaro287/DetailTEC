import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { MakeAppointmentComponent } from './Components/make-appointment/make-appointment.component';
import { BillsComponent } from './Components/bills/bills.component';

const routes: Routes = [
  { path: "", redirectTo: "client_home", pathMatch: "full" },
  { path: 'client_home', component: HomeComponent},
  { path: 'make_appointment', component: MakeAppointmentComponent},
  { path: 'bills', component: BillsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
