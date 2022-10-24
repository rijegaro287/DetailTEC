import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs'

import { apiURL } from '../app.component'

import {
  ServerResponse,
  EmployeesResponse,
  EmployeeResponse,
} from '../Interfaces/ServerResponses'
import { Employee } from '../Interfaces/Employee'

import { EMPLOYEES } from '../TestDB/Employees'

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  url: string = `${apiURL}/trabajador`
  constructor(private httpClient: HttpClient) { }

  getAllEmployees = (): Observable<EmployeesResponse> =>
    this.httpClient.get<EmployeesResponse>(`${this.url}/get_all`)

  getEmployee = (id: number): Observable<EmployeeResponse> => {
    const employee: Employee = EMPLOYEES.find(employee => employee.id === id)!

    const okResponse: EmployeeResponse = {
      status: 'ok',
      employee: employee
    }

    const errorResponse: ServerResponse = {
      status: 'error',
      message: 'No se pudo obtener el empleado'
    }

    return of(okResponse)
  }

  // addEmployee = (employee: Employee): Observable<ServerResponse> => {

  // }
}