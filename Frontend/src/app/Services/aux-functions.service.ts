import { Injectable } from '@angular/core'

import { DateInput, TimeInput } from '../Interfaces/Auxiliaries'

@Injectable({
  providedIn: 'root'
})
export class AuxFunctionsService {

  constructor() { }

  stringToDate = (dateString: string): DateInput => {
    console.log(dateString);

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
}
