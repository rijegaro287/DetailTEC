import { Client } from './Client';
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

interface AllClientsResponse extends ServerResponse {
    clients?: Client[]
}

interface ClientResponse extends ServerResponse {
    client?: Client
}

export {
    ServerResponse,
    AllEmployeesResponse,
    EmployeeResponse,
    AllClientsResponse,
    ClientResponse
}