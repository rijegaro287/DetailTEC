import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

import {
  ServerResponse,
  WashingTypesResponse,
  WashingTypeResponse
} from '../Interfaces/ServerResponses'

import { apiURL } from '../app.component'

@Injectable({
  providedIn: 'root'
})
export class WashingTypeService {
  url = `${apiURL}/lavado`

  constructor(
    private httpClient: HttpClient
  ) { }

  /** Solicita al servidor todos los tipos de lavado */
  getAllWashingTypes = (): Observable<WashingTypesResponse> =>
    this.httpClient.get<WashingTypesResponse>(`${this.url}/get_all`)

  /** 
   * Solicita al servidor un tipo de lavado dado su ID
   * @param id ID del tipo de lavado
   * @returns Objeto con la información del tipo de lavado
  */
  getWashingType = (id: number): Observable<WashingTypeResponse> =>
    this.httpClient.get<WashingTypeResponse>(`${this.url}/get/${id}`)

  /**
   * Solicita al servidor que cree un nuevo tipo de lavado
   * @param washingType Objeto con la información del tipo de lavado
   * @returns Objeto con respuesta del servidor
  */
  createWashingType = (washingType: any): Observable<ServerResponse> => {
    washingType.id = washingType.id.toString()

    washingType.idProductos.forEach((id: string) => Number(id))

    return this.httpClient.post<ServerResponse>(`${this.url}/add`, washingType)
  }

  /**
   * Solicita al servidor que actualice un tipo de lavado
   * @param washingTypeID ID del tipo de lavado
   * @param washingType Objeto con la información del tipo de lavado
   * @returns Objeto con respuesta del servidor
  */
  updateWashingType = (washingTypeID: number, washingType: any): Observable<ServerResponse> => {
    washingType.id = washingType.id.toString()

    washingType.idProductos.forEach((id: string) => Number(id))

    return this.httpClient.patch<ServerResponse>(`${this.url}/update/${washingTypeID}`, washingType)
  }

  /**
   * Solicita al servidor que elimine un tipo de lavado
   * @param id ID del tipo de lavado
   * @returns Objeto con respuesta del servidor
  */
  deleteWashingType = (id: number): Observable<ServerResponse> =>
    this.httpClient.delete<ServerResponse>(`${this.url}/delete/${id}`)
}
