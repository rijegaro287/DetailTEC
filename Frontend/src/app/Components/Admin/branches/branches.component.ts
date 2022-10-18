import { Component, OnInit } from '@angular/core'

import { KeyReplacement } from 'src/app/Interfaces/Auxiliaries'
import { Branch } from 'src/app/Interfaces/Branch'

import { MessageService } from 'src/app/Services/message.service'
import { BranchService } from 'src/app/Services/branch.service'

@Component({
  selector: 'app-admin-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.scss']
})
export class AdminBranchesComponent implements OnInit {
  tableColumns: KeyReplacement<Branch>[]
  tableData: Branch[]

  constructor(
    private branchService: BranchService,
    protected messageService: MessageService
  ) {
    this.tableColumns = [
      { key: "nombre", replacement: "Nombre" },
      { key: "provincia", replacement: "Provincia" },
      { key: "canton", replacement: "Cantón" },
      { key: "distrito", replacement: "Distrito" },
      { key: "telefono", replacement: "Teléfono" }
    ]

    this.tableData = []
  }

  ngOnInit(): void {
    this.messageService.resetMessageInfo()

    this.branchService.getAllBranches()
      .subscribe(response => {
        if (response.status === 'error') {
          this.messageService.setMessageInfo(response.message!, 'error')
        }
        else if (response.branches) {
          this.tableData = response.branches
        }
        else {
          console.log(response)
        }
      })
  }
}
