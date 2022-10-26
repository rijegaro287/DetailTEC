import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { KeyReplacement } from 'src/app/Interfaces/Auxiliaries'
import { Branch } from 'src/app/Interfaces/Branch'

import { BranchService } from 'src/app/Services/branch.service'
import { MessageService } from 'src/app/Services/message.service'
import { AuxFunctionsService } from 'src/app/Services/aux-functions.service'

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
    protected auxFunctionsService: AuxFunctionsService,
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
      { key: "fechaApertura", replacement: "Fecha de apertura" }
    ]

    this.branch = {} as Branch
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id')!)
    this.branchService.getBranch(id)
      .subscribe(response => {
        if (response.status === 'error') {
          this.messageService.setMessageInfo(response.message!, 'error')
        }
        else if (response.branch) {
          this.branch = response.branch

          this.branch.nombreGerente =
            `${this.branch.nombreGerente} ${this.branch.apellidoGerente}`

          this.branch.fechaApertura =
            this.branch.fechaApertura.split('T')[0]

          this.branch.fechaInicioGerente =
            this.branch.fechaInicioGerente.split('T')[0]
        }
        else {
          console.log(response)
        }
      })
  }

  deleteBranch = (): void => {
    this.branchService.deleteBranch(this.branch.id)
      .subscribe(response => {
        if (response.status === 'error') {
          this.messageService.setMessageInfo(response.message!, 'error')
        }
        else {
          window.location.href = '/admin/branches'
        }
      })
  }
}