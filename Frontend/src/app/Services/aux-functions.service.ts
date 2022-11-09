import { Injectable } from '@angular/core'

import { DateInput, TimeInput } from '../Interfaces/Auxiliaries'
import { ServerResponse } from '../Interfaces/ServerResponses'
import { MessageService } from './message.service'

@Injectable({
  providedIn: 'root'
})
export class AuxFunctionsService {

  constructor(
    private messageService: MessageService
  ) { }

  /** 
   * Convierte un string a un objeto que contiene día, mes y año 
   * @param dateString String con formato yyyy-mm-dd
   * @returns Objeto con día, mes y año
  */
  stringToDate = (dateString: string): DateInput => {
    const dateStringArray = dateString.split('-')
    const dateObject: DateInput = {
      year: Number(dateStringArray[0]),
      month: Number(dateStringArray[1]),
      day: Number(dateStringArray[2].split('T')[0])
    }

    return dateObject
  }

  /**
   * Convierte un objeto DateInput a un string con formato yyyy-mm-dd
   * @param dateObject Objeto con día, mes y año
   * @returns String con formato yyyy-mm-dd
  */
  dateToString = (dateObject: DateInput): string => {
    const dateString =
      `${dateObject.year}-${dateObject.month}-${dateObject.day}`

    return dateString
  }

  /**
   * Convierte un string a un objeto que contiene hora y minutos
   * @param timeString String con formato hh:mm
   * @returns Objeto con hora y minutos
  */
  stringToTime = (timeString: string): TimeInput => {
    const timeStringArray = timeString.split(':')
    const timeObject: TimeInput = {
      hour: Number(timeStringArray[0]),
      minute: Number(timeStringArray[1]),
      second: 0
    }

    return timeObject
  }

  /**
   * Convierte un objeto TimeInput a un string con formato hh:mm
   * @param timeObject Objeto con hora y minutos
   * @returns String con formato hh:mm
  */
  timeToString = (timeObject: TimeInput): string => {
    const timeString =
      `${timeObject.hour}:${timeObject.minute}`

    return timeString
  }

  /**
  * Lee una respuesta genérica del backend y actúa en caso 
  * de hbaer un error. 
  * Vuelve a cargar la página en caso contrario
  * @param response Respuesta del backend
  */
  handleResponse = (response: ServerResponse): any => {
    if (response.status === 'error') {
      this.messageService.setMessageInfo(response.message!, 'error')
    }
    else {
      window.location.reload();
    }
  }

  /** 
  * Vuelve a la página anterior en el historial del navegador
  */
  goBack = (): void => window.history.back()
}
