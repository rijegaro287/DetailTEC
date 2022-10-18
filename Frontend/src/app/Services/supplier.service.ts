import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'

import {
  ServerResponse,
  SuppliersResponse,
  SupplierResponse
} from '../Interfaces/ServerResponses'
import { Supplier } from '../Interfaces/Supplier'

import { SUPPLIERS } from '../TestDB/Suppliers'

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  constructor() { }

  getAllSuppliers = (): Observable<SuppliersResponse> => {
    const okResponse: SuppliersResponse = {
      status: 'ok',
      suppliers: SUPPLIERS
    }

    const errorResponse: ServerResponse = {
      status: 'error',
      message: 'No se pudieron obtener los proveedores'
    }

    return of(okResponse)
  }

  getSupplier = (id: number): Observable<SupplierResponse> => {
    const supplier: Supplier = SUPPLIERS.find(supplier => supplier.id === id)!

    const okResponse: SupplierResponse = {
      status: 'ok',
      supplier: supplier
    }

    const errorResponse: ServerResponse = {
      status: 'error',
      message: 'No se pudo obtener el proveedor'
    }

    return of(okResponse)
  }
}
