import { Injectable } from '@angular/core';

import { DateInput } from '../Interfaces/Auxiliaries';

@Injectable({
  providedIn: 'root'
})
export class AuxFunctionsService {

  constructor() { }

  stringToDate = (dateString: string): DateInput => {
    const dateStringArray = dateString.split('-');
    const dateObject: DateInput = {
      year: Number(dateStringArray[0]),
      month: Number(dateStringArray[1]),
      day: Number(dateStringArray[2])
    }

    return dateObject
  }

  dateToString = (dateObject: DateInput): string => {
    const dateString =
      `${dateObject.year}-${dateObject.month}-${dateObject.day}`;

    return dateString
  }
}
