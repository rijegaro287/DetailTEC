import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { MakeAppointmentComponent } from './Components/make-appointment/make-appointment.component';

const routes: Routes = [
  {
  path: '',
  // component: HomeComponent
  component: MakeAppointmentComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
