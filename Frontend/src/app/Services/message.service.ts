import { Injectable } from '@angular/core'

import { MessageInfo } from '../Interfaces/Auxiliaries'

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messageInfo: MessageInfo = {
    message: '',
    type: 'none'
  }

  constructor() { }

  /**
   * Muestra un mensaje
   * @param message Mensaje a mostrar
   * @param type Tipo de mensaje
  */
  setMessageInfo = (
    message: MessageInfo['message'],
    type: MessageInfo['type']
  ) => {
    this.messageInfo.message = message
    this.messageInfo.type = type
  }

  /**
   * Reinicia el estado del mensaje y lo oculta
  */
  resetMessageInfo = () => {
    this.messageInfo = {
      message: '',
      type: 'none'
    }
  }
}
