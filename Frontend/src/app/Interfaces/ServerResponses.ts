import { Bill } from './bill';
import { Employee } from './Employee';
import {Client} from './client';

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

interface AllBillsResponse extends ServerResponse {
    bills?: Bill[]
}

interface BillResponse extends ServerResponse {
    bill?: Bill
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
    AllBillsResponse,
    BillResponse,
    AllClientsResponse,
    ClientResponse
}