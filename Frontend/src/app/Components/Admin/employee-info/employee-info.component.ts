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
      { key: "nombre", replacement: "Nombre" },
      { key: "apellido", replacement: "Apellido" },
      { key: "email", replacement: "Correo" },
      { key: "fechaNacimiento", replacement: "Fecha de nacimiento" },
      { key: "edad", replacement: "Edad" },
      { key: "fechaInicio", replacement: "Fecha de inicio" },
      { key: "puesto", replacement: "Puesto" },
      { key: "frecuenciaPago", replacement: "Frecuencia de pago" }
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