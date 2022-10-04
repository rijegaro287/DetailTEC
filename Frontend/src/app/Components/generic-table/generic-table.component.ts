import { Component, Input, OnInit } from '@angular/core';
import { Attribute } from 'src/app/Interfaces/attribute';


@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.scss',
]
})
export class GenericTableComponent implements OnInit {
  @Input() tableColumns!: any[];
  @Input() tableData!: any[];

  //TODO: No sé como hacer para pasar el arreglo de atributos al html y que no de error
  // @Input() tableColumns!: Attribue[];

  


  constructor() { }

  ngOnInit():void {
  }
}
