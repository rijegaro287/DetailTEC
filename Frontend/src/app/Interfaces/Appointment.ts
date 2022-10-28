interface Appointment {
	id: number
	cedulaCliente: number
	nombreCliente?: string
	placaVehiculo: string
	idSucursal: number
	nombreSucursal?: string
	tipoLavado: number
	nombreLavado?: string
	fecha: string
	hora: string
	medioPago: string
	montoPagado: number
	idEmpleados: number[]
	nombresEmpleados?: string[]
}

export { Appointment }