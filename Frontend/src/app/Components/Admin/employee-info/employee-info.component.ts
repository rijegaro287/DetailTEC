import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { Employee } from 'src/app/Interfaces/Employee'
import { KeyReplacement } from 'src/app/Interfaces/Auxiliaries'

import { EmployeeService } from 'src/app/Services/employee.service'
import { MessageService } from 'src/app/Services/message.service'

@Component({
  selector: 'app-employee-info',
  templateUrl: './employee-info.component.html',
  styleUrls: ['./employee-info.component.scss']
})
export class AdminEmployeeInfoComponent implements OnInit {
  employeeInfoTitles: KeyReplacement<Employee>[]
  employee: Employee

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    protected messageService: MessageService
  ) {
    this.employeeInfoTitles = [
      { key: "id", replacement: "Cédula" },
      { key: "name", replacement: "Nombre" },
      { key: "lastName", replacement: "Apellido" },
      { key: "email", replacement: "Correo" },
      { key: "birthDate", replacement: "Fecha de nacimiento" },
      { key: "age", replacement: "Edad" },
      { key: "startingDate", replacement: "Fecha de inicio" },
      { key: "position", replacement: "Puesto" },
      { key: "paymentFrequency", replacement: "Frecuencia de pago" },
    ]

    this.employee = {} as Employee
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'))
    this.employeeService.getEmployee(id)
      .subscribe(response => {
        if (response.status === 'error') {
          this.messageService.setMessageInfo(response.message!, 'error')
        }
        else if (response.employee) {
          this.employee = response.employee
        }
        else {
          console.log(response)
        }
      })
  }
}
