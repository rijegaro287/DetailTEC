import { Component, OnInit } from '@angular/core';

import { Bill } from 'src/app/Interfaces/bill';
import { KeyReplacement } from 'src/app/Interfaces/Auxiliaries';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.sass']
})
export class BillsComponent implements OnInit {
  tableColumns: KeyReplacement<Bill>[] = [
    { key: "id", replacement: "ID" },
    { key: "date", replacement: "Fecha" },
    { key: "clientID", replacement: "Cédula del Cliente" },
    { key: "branch", replacement: "Sucursal" },
    { key: "total", replacement: "Total" }
  ];

  tableData: Bill[] = [
    { id: 1, date: new Date(), clientID: 123456789, branch: 1, total: 1000 },
    { id: 2, date: new Date(), clientID: 123456789, branch: 1, total: 1000 },
    { id: 3, date: new Date(), clientID: 123456789, branch: 1, total: 1000 },
    { id: 4, date: new Date(), clientID: 123456789, branch: 1, total: 1000 },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
