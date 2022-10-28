import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

import { apiURL } from '../app.component'

import {
  ServerResponse,
  SuppliersResponse,
  SupplierResponse
} from '../Interfaces/ServerResponses'

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  url: string = `${apiURL}/proveedor`

  constructor(
    private httpClient: HttpClient
  ) { }

  /** Solicita al servidor todos los proveedores */
  getAllSuppliers = (): Observable<SuppliersResponse> =>
    this.httpClient.get<SuppliersResponse>(`${this.url}/get_all`)

  /**
   * Solicita al servidor los datos de un proveedor dado
   * @param id ID del proveedor
   * @returns Objeto con los datos del proveedor
  */
  getSupplier = (id: number): Observable<SupplierResponse> =>
    this.httpClient.get<SupplierResponse>(`${this.url}/get/${id}`)

  /**
   * Solicita al servidor que cree un nuevo proveedor
   * @param supplier Objeto con la información del proveedor
   * @returns Objeto con respuesta del servidor
  */
  createSupplier = (supplier: any): Observable<ServerResponse> => {
    supplier.id = supplier.id.toString()

    supplier.telefonos.forEach((telefono: string) => telefono.toString());

    return this.httpClient.post<ServerResponse>(`${this.url}/add`, supplier)
  }

  /**
   * Solicita al servidor que actualice un proveedor
   * @param supplierID ID del proveedor
   * @param supplier Objeto con la información del proveedor
   * @returns Objeto con respuesta del servidor
  */
  updateSupplier = (supplierID: number, supplier: any): Observable<ServerResponse> => {
    supplier.id = supplier.id.toString()

    supplier.telefonos.forEach((telefono: string) => telefono.toString());

    return this.httpClient.patch<ServerResponse>(
      `${this.url}/update/${supplierID}`, supplier)
  }

  /**
   * Solicita al servidor que elimine un proveedor
   * @param id ID del proveedor
   * @returns Objeto con respuesta del servidor
  */
  deleteSupplier = (id: number): Observable<ServerResponse> =>
    this.httpClient.delete<ServerResponse>(`${this.url}/delete/${id}`)
}
