import { Component, Input, OnInit } from '@angular/core';
import {
  HasID,
  KeyReplacement
} from 'src/app/Interfaces/Auxiliaries';

@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.scss',
  ]
})
export class GenericTableComponent<Type extends HasID> implements OnInit {
  @Input() tableColumns: KeyReplacement<Type>[]
  @Input() tableData: Type[]

  //TODO: No sé como hacer para pasar el arreglo de atributos al html y que no de error
  // @Input() tableColumns!: Attribue[];

  // Poner ! en el atributo le asegura a TS que el atributo no es null ni undefined nunca
  // Pero si se da el caso de que sí es, puede tirar error

  constructor() { // Si los inicializa desde aquí, no es necesario poner el ! en el atributo
    this.tableColumns = []
    this.tableData = []
  }

  ngOnInit(): void { }

  onRowClicked = (row: Type) => {
    const location = window.location
    location.href = `${location.pathname}/${row.id}`
  }
}
