import { Component, OnInit } from '@angular/core'

import { KeyReplacement } from 'src/app/Interfaces/Auxiliaries'
import { WashingType } from 'src/app/Interfaces/WashingType'

import { MessageService } from 'src/app/Services/message.service'
import { WashingTypeService } from 'src/app/Services/washing-type.service'

@Component({
  selector: 'app-washing-types',
  templateUrl: './washing-types.component.html',
  styleUrls: ['./washing-types.component.scss']
})
export class AdminWashingTypesComponent implements OnInit {
  tableColumns: KeyReplacement<WashingType>[]
  tableData: WashingType[]

  constructor(
    private washingTypeService: WashingTypeService,
    protected messageService: MessageService
  ) {
    this.tableColumns = [
      { key: "nombre", replacement: "Nombre" },
      { key: "costo", replacement: "Costo" },
      { key: "precio", replacement: "Precio" },
      { key: "duracionMinutos", replacement: "Duración" },
      { key: "puntuacion", replacement: "Puntuación" }
    ]

    this.tableData = []
  }

  ngOnInit(): void {
    this.messageService.resetMessageInfo()

    this.washingTypeService.getAllWashingTypes()
      .subscribe(response => {
        if (response.status === 'error') {
          this.messageService.setMessageInfo(response.message!, 'error')
        }
        else if (response.washingTypes) {
          this.tableData = response.washingTypes
        }
        else {
          console.log(response)
        }
      })
  }
}
