import { Component, Input, OnInit } from '@angular/core';

import { MessageInfo } from 'src/app/Interfaces/MessageInfo';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  @Input() messageInfo: MessageInfo = {
    message: '',
    type: 'none'
  }

  constructor() { }

  ngOnInit(): void {
    this.messageInfo.message = ''
    this.messageInfo.type = 'none'
  }
}
