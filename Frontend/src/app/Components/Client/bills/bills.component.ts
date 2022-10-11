import { Component, OnInit } from '@angular/core';

import { MessageService } from 'src/app/Services/message.service';
import { BillService } from 'src/app/Services/bill.service';

import { Bill } from 'src/app/Interfaces/bill';
import { KeyReplacement } from 'src/app/Interfaces/Auxiliaries';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.sass']
})
export class BillsComponent implements OnInit {
  tableColumns: KeyReplacement<Bill>[];
  tableData: Bill[] = []

  constructor(
    private billService: BillService,
    protected messageService: MessageService
  ) {
    this.tableColumns = [
      { key: "id", replacement: "ID" },
      { key: "date", replacement: "Fecha" },
      { key: "clientID", replacement: "Cédula del Cliente" },
      { key: "total", replacement: "Total" }
    ];
  }
  

  ngOnInit(): void {
    this.messageService.resetMessageInfo();

    this.billService.getAllBills()
      .subscribe(response => {
        if (response.status === 'error') {
          this.messageService.setMessageInfo(response.message!, 'error');
        }
        else if (response.bills) {
          this.tableData = response.bills;
        }
        else {
          console.log(response);
        }
      })
  }
}
