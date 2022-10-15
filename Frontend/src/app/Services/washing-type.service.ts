import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { AllWashingTypesResponse, ServerResponse, WashingTypeResponse } from '../Interfaces/ServerResponses';

import { WashingType } from '../Interfaces/WashingType';

import { WASHINGTYPES } from '../TestDB/WashingTypes';

@Injectable({
  providedIn: 'root'
})
export class WashingTypeService {
  constructor() { }

  getAllWashingTypes = (): Observable<AllWashingTypesResponse> => {
    const okResponse: AllWashingTypesResponse = {
      status: 'ok',
      washingTypes: WASHINGTYPES
    }

    const errorResponse: ServerResponse = {
      status: 'error',
      message: 'No se pudieron obtener los tipos de lavado'
    }

    return of(okResponse)
  }

  getWashingType = (name: string): Observable<WashingTypeResponse> => {
    const washingType: WashingType = WASHINGTYPES.find(washingType => washingType.nombre === name)!

    const okResponse: WashingTypeResponse = {
      status: 'ok',
      washingType: washingType
    }

    const errorResponse: ServerResponse = {
      status: 'error',
      message: 'No se pudo obtener el tipo de lavado'
    }

    return of(okResponse)
  }
}
