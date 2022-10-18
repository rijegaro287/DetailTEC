import { Appointment } from "../Interfaces/Appointment";

const APPOINTMENTS: Appointment[] = []
for (let index = 1; index < 10; index++) {
    let ID = index;
    if (index <= 3) { ID = 1 }

    APPOINTMENTS.push({
        id: index,
        placaVehiculo: "ABC-123",
        nombreSucursal: `Sucursal ${index}`,
        idCliente: ID,
        nombreCliente: `Cliente ${ID}`,
        tipoLavado: `Lavado ${index}`,
        fecha: "2021-01-01",
        hora: "12:00"
    })
}

export { APPOINTMENTS }