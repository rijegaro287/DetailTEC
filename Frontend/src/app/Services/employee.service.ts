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

  /**
   * Solicita al servidor que devuelva todos los empleados
  */
  getAllEmployees = (): Observable<EmployeesResponse> =>
    this.httpClient.get<EmployeesResponse>(`${this.url}/get_all`)

  /**
   * Solicita al servidor que devuelva la información de un empleado
   * @param employeeID ID del empleado
  */
  getEmployee = (id: number): Observable<EmployeeResponse> =>
    this.httpClient.get<EmployeeResponse>(`${this.url}/get/${id}`)

  /**
   * Solicita al servidor que cree un nuevo empleado
   * @param employee Objeto con la información del empleado
   * @returns Objeto con respuesta del servidor
  */
  createEmployee = (employee: any): Observable<ServerResponse> => {
    employee.id = employee.id.toString()
    employee.fechaNacimiento = this.auxFunctionsService
      .dateToString(employee.fechaNacimiento)
    employee.fechaInicio = this.auxFunctionsService
      .dateToString(employee.fechaInicio)

    employee.password = employee.password.toString();

    return this.httpClient.post<ServerResponse>(`${this.url}/add`, employee)
  }

  /**
   * Solicita al servidor que actualice la información de un empleado
   * @param employeeID ID del empleado
   * @param employee Objeto con la información del empleado
   * @returns Objeto con respuesta del servidor
  */
  updateEmployee = (employeeID: number, employee: any): Observable<ServerResponse> => {
    employee.id = employee.id.toString()

    employee.fechaNacimiento = this.auxFunctionsService
      .dateToString(employee.fechaNacimiento)

    employee.fechaInicio = this.auxFunctionsService
      .dateToString(employee.fechaInicio)

    employee.password = employee.password.toString();

    return this.httpClient.patch<ServerResponse>(`${this.url}/update/${employeeID}`, employee)
  }

  /**
   * Solicita al servidor que elimine un empleado
   * @param id ID del empleado
   * @returns Objeto con respuesta del servidor
  */
  deleteEmployee = (id: number): Observable<ServerResponse> =>
    this.httpClient.delete<ServerResponse>(`${this.url}/delete/${id}`)
} 