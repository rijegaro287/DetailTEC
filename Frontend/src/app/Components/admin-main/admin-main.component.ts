import { Component, OnInit } from '@angular/core'
import { NavbarLink } from 'src/app/Interfaces/NavbarLink'

@Component({
  selector: 'app-admin-main',
  templateUrl: './admin-main.component.html',
  styleUrls: ['./admin-main.component.scss']
})
export class AdminMainComponent implements OnInit {
  navbarLinks: NavbarLink[] = [
    { href: 'employees', name: 'Empleados' },
    { href: 'clients', name: 'Clientes' },
    { href: 'branches', name: 'Sucursales' },
    { href: 'appointments', name: 'Citas' },
    { href: 'suppliers', name: 'Proveedores' },
    { href: 'products', name: 'Productos' },
    { href: 'services', name: 'Servicios' },
    { href: 'bills', name: 'Facturas' }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
