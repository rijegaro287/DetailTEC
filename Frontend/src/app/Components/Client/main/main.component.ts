import { Component, OnInit } from '@angular/core';

import { NavbarLink } from 'src/app/Interfaces/Auxiliaries';
import { ClientService } from 'src/app/Services/client.service';

import { MessageService } from 'src/app/Services/message.service'

@Component({
  selector: 'app-home',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class ClientMainComponent implements OnInit {
  navbarLinks: NavbarLink[];

  constructor(
    private clientService: ClientService,
    protected messageService: MessageService
  ) {
    this.navbarLinks = [
      { href: `data`, name: 'Mis datos' },
      { href: 'appointments', name: 'Citas' },
      { href: 'bills', name: 'Facturas' }
    ];
  }

  ngOnInit(): void { }
}




