import { Injectable } from '@angular/core';

import { MessageInfo } from '../Interfaces/MessageInfo';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messageInfo: MessageInfo = {
    message: '',
    type: 'none'
  }

  constructor() { }

  setMessageInfo = (
    message: MessageInfo['message'],
    type: MessageInfo['type']
  ) => {
    this.messageInfo.message = message
    this.messageInfo.type = type
  }

  resetMessageInfo = () => {
    this.messageInfo = {
      message: '',
      type: 'none'
    }
  }
}
