import { Component, OnInit } from '@angular/core';

import { NavbarLink } from 'src/app/Interfaces/Auxiliaries';

@Component({
  selector: 'app-home',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class ClientMainComponent implements OnInit {
  navbarLinks: NavbarLink[];

  constructor() {
    this.navbarLinks = [
      { href: 'data', name: 'Mis datos' },
      { href: 'appointments', name: 'Citas' },
      { href: 'bills', name: 'Facturas' }
    ];
  }

  ngOnInit(): void { }
}