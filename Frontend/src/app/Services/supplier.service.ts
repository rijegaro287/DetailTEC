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

  getAllSuppliers = (): Observable<SuppliersResponse> =>
    this.httpClient.get<SuppliersResponse>(`${this.url}/get_all`)

  getSupplier = (id: number): Observable<SupplierResponse> =>
    this.httpClient.get<SupplierResponse>(`${this.url}/get/${id}`)

  createSupplier = (supplier: any): Observable<ServerResponse> => {
    supplier.id = supplier.id.toString()

    supplier.telefonos.forEach((telefono: string) => telefono.toString());

    return this.httpClient.post<ServerResponse>(`${this.url}/add`, supplier)
  }

  updateSupplier = (supplierID: number, supplier: any): Observable<ServerResponse> => {
    supplier.id = supplier.id.toString()

    supplier.telefonos.forEach((telefono: string) => telefono.toString());

    return this.httpClient.patch<ServerResponse>(
      `${this.url}/update/${supplierID}`, supplier)
  }

  deleteSupplier = (id: number): Observable<ServerResponse> =>
    this.httpClient.delete<ServerResponse>(`${this.url}/delete/${id}`)
}
