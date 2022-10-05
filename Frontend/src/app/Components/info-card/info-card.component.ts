import { Component, Input, OnInit } from '@angular/core'

import { KeyReplacement } from 'src/app/Interfaces/Auxiliaries'

@Component({
  selector: 'app-info-card',
  templateUrl: './info-card.component.html',
  styleUrls: ['./info-card.component.scss']
})
export class InfoCardComponent<Type> implements OnInit {
  @Input() infoTitles: KeyReplacement<Type>[]
  @Input() info: Type

  constructor() {
    this.infoTitles = []
    this.info = {} as Type
  }

  ngOnInit(): void { }
}
