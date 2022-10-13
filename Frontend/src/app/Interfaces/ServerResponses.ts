import { Client } from './Client';
import { Bill } from './Bill';
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

interface AllBillsResponse extends ServerResponse {
    bills?: Bill[]
}

interface BillResponse extends ServerResponse {
    bill?: Bill
}



export {
    ServerResponse,
    AllEmployeesResponse,
    EmployeeResponse,
    AllBillsResponse,
    BillResponse,
    AllClientsResponse,
    ClientResponse
}