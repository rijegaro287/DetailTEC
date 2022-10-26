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

  stringToDate = (dateString: string): DateInput => {
    const dateStringArray = dateString.split('-')
    const dateObject: DateInput = {
      year: Number(dateStringArray[0]),
      month: Number(dateStringArray[1]),
      day: Number(dateStringArray[2].split('T')[0])
    }

    return dateObject
  }

  dateToString = (dateObject: DateInput): string => {
    const dateString =
      `${dateObject.year}-${dateObject.month}-${dateObject.day}`

    return dateString
  }

  stringToTime = (timeString: string): TimeInput => {
    const timeStringArray = timeString.split(':')
    const timeObject: TimeInput = {
      hour: Number(timeStringArray[0]),
      minute: Number(timeStringArray[1]),
      second: 0
    }

    return timeObject
  }

  timeToString = (timeObject: TimeInput): string => {
    const timeString =
      `${timeObject.hour}:${timeObject.minute}`

    return timeString
  }

  handleResponse = (response: ServerResponse): any => {
    if (response.status === 'error') {
      this.messageService.setMessageInfo(response.message!, 'error')
    }
    else {
      window.location.reload();
    }
  }

  goBack = (): void => window.history.back()
}
