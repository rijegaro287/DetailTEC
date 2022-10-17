import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/Services/message.service'
import { NavbarLink } from 'src/app/Interfaces/Auxiliaries';
import { ClientService } from 'src/app/Services/client.service';
import { Client } from 'src/app/Interfaces/Client';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  navbarLinks: NavbarLink[];

  points:number;
  id:number;
  client:Client;


  constructor(
    private clientService: ClientService,
    protected messageService: MessageService
  ) {
    this.points = 100;
    this.id = 1;
    this.client = {} as Client;
    this.navbarLinks = [];
  }

  ngOnInit(): void {
    this.messageService.resetMessageInfo()

    this.clientService.getClient(1)
      .subscribe(response => {
        if (response.status === 'error') {
          this.messageService.setMessageInfo(response.message!, 'error')
        }
        else if (response.client) {
          this.client = response.client
        }
        else {
          console.log(response)
        }
      })
    
      this.navbarLinks = [
            { href: 'bills', name: 'Facturas' },
            { href: `data/${this.client.id}`, name: 'Datos de cuenta' }
      ];
  }
}




