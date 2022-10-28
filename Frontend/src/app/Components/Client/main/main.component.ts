import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { NavbarLink } from 'src/app/Interfaces/Auxiliaries'

@Component({
  selector: 'app-home',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class ClientMainComponent implements OnInit {
  navbarLinks: NavbarLink[]

  constructor(
    private route: ActivatedRoute
  ) {
    this.navbarLinks = []
  }

  ngOnInit(): void {
    const clientID = Number(this.route.snapshot.paramMap.get('clientID'))

    this.navbarLinks = [
      { href: 'info', name: 'Mis datos', state: { clientID: clientID } },
      { href: 'appointments', name: 'Citas', state: { clientID: clientID } },
      { href: 'bills', name: 'Facturas', state: { clientID: clientID } }
    ]
  }
}