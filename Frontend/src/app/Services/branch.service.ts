import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'

import {
  ServerResponse,
  BranchResponse,
  BranchesResponse
} from '../Interfaces/ServerResponses'

import { AuxFunctionsService } from './aux-functions.service'

import { apiURL } from '../app.component'

@Injectable({
  providedIn: 'root'
})
export class BranchService {
  url: string = `${apiURL}/sucursal`

  constructor(
    private httpClient: HttpClient,
    private auxFunctionsService: AuxFunctionsService
  ) { }

  getAllBranches = (): Observable<BranchesResponse> =>
    this.httpClient.get<BranchesResponse>(`${this.url}/get_all`)

  getBranch = (id: number): Observable<BranchResponse> =>
    this.httpClient.get<BranchResponse>(`${this.url}/get/${id}`)

  createBranch = (branch: any): Observable<ServerResponse> => {
    branch.id = branch.id.toString()

    branch.telefono = branch.telefono.toString()

    branch.fechaInicioGerente = this.auxFunctionsService
      .dateToString(branch.fechaInicioGerente)

    branch.fechaApertura = this.auxFunctionsService
      .dateToString(branch.fechaApertura)

    return this.httpClient.post<ServerResponse>(`${this.url}/add`, branch)
  }

  updateBranch = (branchID: number, branch: any): Observable<ServerResponse> => {
    branch.id = branch.id.toString()

    branch.telefono = branch.telefono.toString()

    branch.fechaInicioGerente = this.auxFunctionsService
      .dateToString(branch.fechaInicioGerente)

    branch.fechaApertura = this.auxFunctionsService
      .dateToString(branch.fechaApertura)

    return this.httpClient.patch<ServerResponse>(`${this.url}/update/${branchID}`, branch)
  }

  deleteBranch = (id: number): Observable<ServerResponse> =>
    this.httpClient.delete<ServerResponse>(`${this.url}/delete/${id}`)
}
