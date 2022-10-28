import { Component, Input, OnInit } from '@angular/core'
import { KeyReplacement } from 'src/app/Interfaces/Auxiliaries'

@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.scss',
  ]
})
export class GenericTableComponent<Type> implements OnInit {
  @Input() tableColumns: KeyReplacement<Type>[]
  @Input() tableData: Type[]
  @Input() rowIDKey: keyof Type
  @Input() onClick?: (rowID: number) => void

  constructor() {
    this.tableColumns = []
    this.tableData = []
    this.rowIDKey = "" as keyof Type
  }

  ngOnInit(): void { }

  onRowClicked = (row: Type) => {
    if (this.onClick) {
      const rowID = row[this.rowIDKey]
      this.onClick(rowID as any)
    }
    else {
      const location = window.location
      const rowID = row[this.rowIDKey]
      location.href = `${location.pathname}/${rowID}`
    }
  }
}
