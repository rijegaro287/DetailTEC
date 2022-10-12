import { Component, Input, OnInit } from '@angular/core';
import { Client } from 'src/app/Interfaces/Client';

@Component({
  selector: 'app-add-client-form',
  templateUrl: './add-client-form.component.html',
  styleUrls: ['./add-client-form.component.scss']
})
export class AddClientFormComponent implements OnInit {
  @Input() clientInfo?: Client
  constructor() { }

  ngOnInit(): void {
  }

}
