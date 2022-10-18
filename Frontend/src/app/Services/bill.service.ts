import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import {
  ServerResponse,
  BillsResponse,
  BillResponse
} from '../Interfaces/ServerResponses';

import { Bill } from '../Interfaces/Bill';

import { BILLS } from '../TestDB/Bills';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  constructor() { }

  getAllBills = (): Observable<BillsResponse> => {
    const okResponse: BillsResponse = {
      status: 'ok',
      bills: BILLS
    }

    const errorResponse: ServerResponse = {
      status: 'error',
      message: 'No se pudieron obtener las facturas'
    }

    return of(okResponse)
  }

  getClientBills = (client_id: number): Observable<BillsResponse> => {
    const bills: Bill[] = BILLS.filter(bill => bill.idCliente === client_id)!

    const okResponse: BillsResponse = {
      status: 'ok',
      bills: bills
    }

    const errorResponse: ServerResponse = {
      status: 'error',
      message: 'No se pudieron obtener las facturas'
    }

    return of(okResponse)
  }

  getBill = (id: number): Observable<BillResponse> => {
    const bill: Bill = BILLS.find(bill => bill.id === id)!

    const okResponse: BillResponse = {
      status: 'ok',
      bill: bill
    }

    const errorResponse: ServerResponse = {
      status: 'error',
      message: 'No se pudo obtener la factura'
    }

    return of(okResponse)
  }
}
