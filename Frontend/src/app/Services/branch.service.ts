import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import {
  ServerResponse,
  BranchResponse,
  BranchesResponse
} from '../Interfaces/ServerResponses';
import { Branch } from '../Interfaces/Branch';

import { BRANCHES } from '../TestDB/Branches';

@Injectable({
  providedIn: 'root'
})
export class BranchService {
  constructor() { }

  getAllBranches = (): Observable<BranchesResponse> => {
    const okResponse: BranchesResponse = {
      status: 'ok',
      branches: BRANCHES
    }

    const errorResponse: ServerResponse = {
      status: 'error',
      message: 'No se pudieron obtener las sucursales'
    }

    return of(okResponse)
  }

  getBranch = (nombre: string): Observable<BranchResponse> => {
    const branch: Branch = BRANCHES.find(branch => branch.nombre === nombre)!

    const okResponse: BranchResponse = {
      status: 'ok',
      branch: branch
    }

    const errorResponse: ServerResponse = {
      status: 'error',
      message: 'No se pudo obtener el sucursal'
    }

    return of(okResponse)
  }
}
