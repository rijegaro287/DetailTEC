import { Employee } from './Employee';
import { Client } from './Client';
import { Branch } from './Branch';
import { Bill } from './Bill';

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

interface AllBranchesResponse extends ServerResponse {
    branches?: Branch[]
}

interface BranchResponse extends ServerResponse {
    branch?: Branch
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
    ClientResponse,
    AllBranchesResponse,
    BranchResponse
}