import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

import { apiURL } from '../app.component'

import { Employee } from '../Interfaces/Employee'

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
    console.log(employee);

    employee.id = employee.id.toString()
    employee.edad = 1;
    employee.password = '1234';
    employee.fechaNacimiento = this.auxFunctionsService.dateToString(employee.fechaNacimiento)
    employee.fechaInicio = this.auxFunctionsService.dateToString(employee.fechaInicio)

    console.log(employee);


    return this.httpClient.post<ServerResponse>(`${this.url}/add`, { trabajador: employee })
  }
} 