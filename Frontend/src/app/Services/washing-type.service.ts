import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

import {
  ServerResponse,
  WashingTypesResponse,
  WashingTypeResponse
} from '../Interfaces/ServerResponses'

import { AuxFunctionsService } from './aux-functions.service'

import { apiURL } from '../app.component'

@Injectable({
  providedIn: 'root'
})
export class WashingTypeService {
  url = `${apiURL}/lavado`

  constructor(
    private httpClient: HttpClient
  ) { }

  getAllWashingTypes = (): Observable<WashingTypesResponse> =>
    this.httpClient.get<WashingTypesResponse>(`${this.url}/get_all`)

  getWashingType = (id: number): Observable<WashingTypeResponse> =>
    this.httpClient.get<WashingTypeResponse>(`${this.url}/get/${id}`)

  createWashingType = (washingType: any): Observable<ServerResponse> => {
    washingType.id = washingType.id.toString()

    washingType.idProductos.forEach((id: string) => Number(id))

    return this.httpClient.post<ServerResponse>(`${this.url}/add`, washingType)
  }

  updateWashingType = (washingTypeID: number, washingType: any): Observable<ServerResponse> => {
    washingType.id = washingType.id.toString()

    washingType.idProductos.forEach((id: string) => Number(id))

    return this.httpClient.patch<ServerResponse>(`${this.url}/update/${washingTypeID}`, washingType)
  }

  deleteWashingType = (id: number): Observable<ServerResponse> =>
    this.httpClient.delete<ServerResponse>(`${this.url}/delete/${id}`)
}
