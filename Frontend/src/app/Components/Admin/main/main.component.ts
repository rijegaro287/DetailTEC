import { Component, OnInit } from '@angular/core'

import { NavbarLink } from 'src/app/Interfaces/Auxiliaries'

@Component({
  selector: 'app-admin-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class AdminMainComponent implements OnInit {
  navbarLinks: NavbarLink[]

  constructor() {
    this.navbarLinks = [
      { href: 'employees', name: 'Empleados' },
      { href: 'clients', name: 'Clientes' },
      { href: 'appointments', name: 'Citas' },
      { href: 'branches', name: 'Sucursales' },
      { href: 'washing_types', name: 'Lavados' },
      { href: 'suppliers', name: 'Proveedores' },
      { href: 'products', name: 'Productos' },
      { href: 'bills', name: 'Facturas' }
    ]
  }

  ngOnInit(): void { }
}
