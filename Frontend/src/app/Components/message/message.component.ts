import { Component, Input, OnInit } from '@angular/core'

import { MessageInfo } from 'src/app/Interfaces/Auxiliaries'

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  @Input() messageInfo: MessageInfo

  constructor() {
    this.messageInfo = {} as MessageInfo
  }

  ngOnInit(): void { }
}
