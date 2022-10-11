import { Bill } from './bill';
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
    BillResponse
}