import { Appointment } from "../Interfaces/Appointment";

const APPOINTMENTS: Appointment[] = []
for (let index = 1; index < 10; index++) {
    let ID = index;
    if (index <= 3) { ID = 1 }

    APPOINTMENTS.push({
        id: index,
        placaVehiculo: "ABC-123",
        nombreSucursal: `Sede ${index}`,
        idCliente: ID,
        nombreCliente: `Cliente ${ID}`,
        tipoLavado: `Lavado y aspirado`,
        fecha: "2021-01-01",
        hora: "8:00"
    })
}

export { APPOINTMENTS }