interface Appointment {
	id: number
	idCliente: number
	nombreCliente?: string
	placaVehiculo: string
	nombreSucursal: string
	tipoLavado: string
	fecha: string
	hora: string
	idEmpleados: number[]
}

export { Appointment }