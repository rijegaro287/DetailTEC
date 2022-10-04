import { Component, Input, OnInit } from '@angular/core';
import { TableHead } from 'src/app/Interfaces/TableHead';


@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.scss',
  ]
})
export class GenericTableComponent<Type> implements OnInit {
  @Input() tableColumns: TableHead<Type>[]
  @Input() tableData: Type[]

  //TODO: No sé como hacer para pasar el arreglo de atributos al html y que no de error
  // @Input() tableColumns!: Attribue[];

  // Poner ! en el atributo le asegura a TS que el atributo no es null ni undefined nunca
  // Pero si se da el caso de que sí es, puede tirar error

  constructor() { // Si los inicializa desde aquí, no es necesario poner el ! en el atributo
    this.tableColumns = []
    this.tableData = []
  }

  ngOnInit(): void {
  }
}
