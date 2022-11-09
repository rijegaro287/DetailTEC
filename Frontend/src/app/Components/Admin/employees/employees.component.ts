import { Component, OnInit } from '@angular/core'

import { MessageService } from 'src/app/Services/message.service'
import { EmployeeService } from 'src/app/Services/employee.service'

import { Employee } from 'src/app/Interfaces/Employee'
import { KeyReplacement } from 'src/app/Interfaces/Auxiliaries'

@Component({
  selector: 'app-admin-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})

export class AdminEmployeesComponent implements OnInit {
  tableColumns: KeyReplacement<Employee>[]
  tableData: Employee[]

  constructor(
    private employeeService: EmployeeService,
    protected messageService: MessageService
  ) {
    this.tableColumns = [
      { key: "nombre", replacement: "Nombre" },
      { key: "apellido1", replacement: "Primer apellido" },
      { key: "apellido2", replacement: "Segundo apellido" },
      { key: "id", replacement: "Cédula" },
      { key: "email", replacement: "Correo" },
      { key: "puesto", replacement: "Puesto" },
    ]

    this.tableData = []
  }

  ngOnInit(): void {
    this.messageService.resetMessageInfo()

    this.employeeService.getAllEmployees()
      .subscribe(response => {
        if (response.status === 'error') {
          this.messageService.setMessageInfo(response.message!, 'error')
        }
        else if (response.employees) {
          this.tableData = response.employees
        }
        else {
          console.log(response)
        }
      })
  }
}
