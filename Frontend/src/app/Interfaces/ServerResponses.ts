import { Employee } from './Employee';
import { Client } from './Client';
import { Branch } from './Branch';
import { Bill } from './Bill';
import { Supplier } from './Supplier';
import { Product } from './Product';
import { WashingType } from './WashingType';
import { Appointment } from './Appointment';

interface ServerResponse {
    status?: 'ok' | 'error'
    message?: string
}

interface EmployeesResponse extends ServerResponse {
    employees?: Employee[]
}

interface EmployeeResponse extends ServerResponse {
    employee?: Employee
}

interface ClientsResponse extends ServerResponse {
    clients?: Client[]
}

interface ClientResponse extends ServerResponse {
    client?: Client
}

interface BranchesResponse extends ServerResponse {
    branches?: Branch[]
}

interface BranchResponse extends ServerResponse {
    branch?: Branch
}

interface SuppliersResponse extends ServerResponse {
    suppliers?: Supplier[]
}

interface SupplierResponse extends ServerResponse {
    supplier?: Supplier
}

interface WashingTypesResponse extends ServerResponse {
    washingTypes?: WashingType[]
}

interface WashingTypeResponse extends ServerResponse {
    washingType?: WashingType
}

interface ProductsResponse extends ServerResponse {
    products?: Product[]
}

interface ProductResponse extends ServerResponse {
    product?: Product
}

interface AppointmentsResponse extends ServerResponse {
    appointments?: Appointment[]
}

interface AppointmentResponse extends ServerResponse {
    appointment?: Appointment
}

interface BillsResponse extends ServerResponse {
    bills?: Bill[]
}

interface BillResponse extends ServerResponse {
    bill?: Bill
}

export {
    ServerResponse,
    EmployeesResponse,
    EmployeeResponse,
    ClientsResponse,
    ClientResponse,
    BranchesResponse,
    BranchResponse,
    WashingTypesResponse,
    WashingTypeResponse,
    ProductsResponse,
    ProductResponse,
    SuppliersResponse,
    SupplierResponse,
    AppointmentsResponse,
    AppointmentResponse,
    BillsResponse,
    BillResponse,
}