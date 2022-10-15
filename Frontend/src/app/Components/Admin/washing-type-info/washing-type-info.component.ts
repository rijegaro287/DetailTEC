import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { KeyReplacement } from 'src/app/Interfaces/Auxiliaries';
import { WashingType } from 'src/app/Interfaces/WashingType';

import { MessageService } from 'src/app/Services/message.service';
import { WashingTypeService } from 'src/app/Services/washing-type.service';

@Component({
  selector: 'app-washing-type-info',
  templateUrl: './washing-type-info.component.html',
  styleUrls: ['./washing-type-info.component.scss']
})
export class AdminWashingTypeInfoComponent implements OnInit {
  washingTypeInfoTitles: KeyReplacement<WashingType>[]
  washingType: WashingType

  constructor(
    private route: ActivatedRoute,
    private washingTypeService: WashingTypeService,
    protected messageService: MessageService
  ) {
    this.washingTypeInfoTitles = [
      { key: "nombre", replacement: "Nombre" },
      { key: "costo", replacement: "Costo" },
      { key: "precio", replacement: "Precio" },
      { key: "duracionMinutos", replacement: "Duración" },
      { key: "nombresProductos", replacement: "Productos" },
      { key: "puntuacion", replacement: "Puntuación" }
    ]

    this.washingType = {} as WashingType
  }

  ngOnInit(): void {
    const name = this.route.snapshot.paramMap.get('name')!
    this.washingTypeService.getWashingType(name)
      .subscribe(response => {
        if (response.status === 'error') {
          this.messageService.setMessageInfo(response.message!, 'error')
        }
        else if (response.washingType) {
          this.washingType = response.washingType
        }
        else {
          console.log(response)
        }
      })
  }
}
