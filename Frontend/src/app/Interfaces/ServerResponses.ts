import { Employee } from './Employee';

interface ServerResponse {
    status?: string
    message?: string
}

interface AllEmployeesResponse extends ServerResponse {
    employees?: Employee[]
}

interface EmployeeResponse extends ServerResponse {
    employee?: Employee
}

export {
    ServerResponse,
    AllEmployeesResponse,
    EmployeeResponse
}