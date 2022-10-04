import { Component, OnInit } from '@angular/core';
import { Bill } from 'src/app/Interfaces/bill';
import { TableHead } from 'src/app/Interfaces/TableHead';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.sass']
})
export class BillsComponent implements OnInit {
  tableColumns: TableHead<Bill>[] = [
    { field: "id", header: "ID" },
    { field: "date", header: "Fecha" },
    { field: "clientID", header: "Cédula del Cliente" },
    { field: "branch", header: "Sucursal" },
    { field: "total", header: "Total" }
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
