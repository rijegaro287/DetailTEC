import { Component, OnInit } from '@angular/core';
import { NavbarLink } from 'src/app/Interfaces/NavbarLink';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  navbarLinks: NavbarLink[] = [
    { href: 'bills', name: 'Facturas' },
    { href: 'make_appointment', name: 'Registrar Cita' }
  ]
  
  constructor() { }

  ngOnInit(): void {
  }

  goToMakeAppointment() {
  }

  goToBills() {
  }

}
