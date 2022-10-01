import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { HeroesComponent } from './Components/heroes/heroes.component'
import { DashboardComponent } from './Components/dashboard/dashboard.component'
import { HeroDetailComponent } from './Components/hero-detail/hero-detail.component'
import { LoginFormComponent } from './Components/login-form/login-form.component'

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginFormComponent }
  // { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  // { path: 'dashboard', component: DashboardComponent },
  // { path: 'heroes', component: HeroesComponent },
  // { path: 'heroes/detail/:id', component: HeroDetailComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
