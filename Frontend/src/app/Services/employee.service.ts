import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'

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
  constructor() { }

  getAllEmployees = (): Observable<EmployeesResponse> => {
    const okResponse: EmployeesResponse = {
      status: 'ok',
      employees: EMPLOYEES
    }

    const errorResponse: ServerResponse = {
      status: 'error',
      message: 'No se pudieron obtener los empleados'
    }

    return of(okResponse)
  }

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