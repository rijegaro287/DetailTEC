interface Appointment {
    id: number
    idCliente: number
    placaVehiculo: string
    nombreCliente: string
    nombreSucursal: string
    tipoLavado: string
    fecha: string
    hora: string
    idEmpleados: number[]
}

export { Appointment }