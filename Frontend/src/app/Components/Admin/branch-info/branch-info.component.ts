import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'

import { KeyReplacement } from 'src/app/Interfaces/Auxiliaries';
import { Branch } from 'src/app/Interfaces/Branch';

import { BranchService } from 'src/app/Services/branch.service';
import { EmployeeService } from 'src/app/Services/employee.service';
import { MessageService } from 'src/app/Services/message.service';

@Component({
  selector: 'app-branch-info',
  templateUrl: './branch-info.component.html',
  styleUrls: ['./branch-info.component.scss']
})
export class AdminBranchInfoComponent implements OnInit {
  branchInfoTitles: KeyReplacement<Branch>[]

  branch: Branch

  constructor(
    private route: ActivatedRoute,
    private branchService: BranchService,
    protected messageService: MessageService
  ) {
    this.branchInfoTitles = [
      { key: "nombre", replacement: "Nombre" },
      { key: "provincia", replacement: "Provincia" },
      { key: "canton", replacement: "Cantón" },
      { key: "distrito", replacement: "Distrito" },
      { key: "telefono", replacement: "Teléfono" },
      { key: "nombreGerente", replacement: "Gerente" },
      { key: "fechaInicioGerente", replacement: "Fecha de inicio del gerente" },
      { key: "fechaApertura", replacement: "Fecha de apertura" },
    ]

    this.branch = {} as Branch
  }

  ngOnInit(): void {
    const nombre = this.route.snapshot.paramMap.get('name')!
    this.branchService.getBranch(nombre)
      .subscribe(response => {
        if (response.status === 'error') {
          this.messageService.setMessageInfo(response.message!, 'error')
        }
        else if (response.branch) {
          this.branch = response.branch
        }
        else {
          console.log(response)
        }
      })
  }
}