import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

import { apiURL } from '../app.component'

import {
  EmployeesResponse,
  EmployeeResponse,
  ServerResponse,
} from '../Interfaces/ServerResponses'

import { AuxFunctionsService } from './aux-functions.service'

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  url: string = `${apiURL}/trabajador`

  constructor(
    private httpClient: HttpClient,
    private auxFunctionsService: AuxFunctionsService
  ) { }

  getAllEmployees = (): Observable<EmployeesResponse> =>
    this.httpClient.get<EmployeesResponse>(`${this.url}/get_all`)

  getEmployee = (id: number): Observable<EmployeeResponse> =>
    this.httpClient.get<EmployeeResponse>(`${this.url}/get/${id}`)

  createEmployee = (employee: any): Observable<ServerResponse> => {
    employee.id = employee.id.toString()
    employee.fechaNacimiento = this.auxFunctionsService
      .dateToString(employee.fechaNacimiento)
    employee.fechaInicio = this.auxFunctionsService
      .dateToString(employee.fechaInicio)

    employee.password = employee.password.toString();

    return this.httpClient.post<ServerResponse>(`${this.url}/add`, employee)
  }

  updateEmployee = (employeeID: number, employee: any): Observable<ServerResponse> => {
    employee.id = employee.id.toString()

    employee.fechaNacimiento = this.auxFunctionsService
      .dateToString(employee.fechaNacimiento)

    employee.fechaInicio = this.auxFunctionsService
      .dateToString(employee.fechaInicio)

    employee.password = employee.password.toString();

    return this.httpClient.patch<ServerResponse>(`${this.url}/update/${employeeID}`, employee)
  }

  deleteEmployee = (id: number): Observable<ServerResponse> =>
    this.httpClient.delete<ServerResponse>(`${this.url}/delete/${id}`)
} 