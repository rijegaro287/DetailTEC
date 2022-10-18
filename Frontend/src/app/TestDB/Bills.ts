import { Bill } from "../Interfaces/Bill";

const BILLS: Bill[] = []
for (let index = 1; index < 10; index++) {
    let ID = index;
    if (index <= 3) { ID = 1 }

    BILLS.push({
        id: index,
        placaVehiculo: "ABC123",
        nombreSucursal: `Sucursal ${index}`,
        idCliente: ID,
        nombreCliente: `Cliente ${ID}`,
        tipoLavado: `Lavado ${index}`,
        fecha: "2021-10-10",
        hora: "10:10",
        montoPagado: index * 1000,
        puntosUtilizados: index * 100
    })
}

export { BILLS }