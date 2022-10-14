import { Supplier } from "../Interfaces/Supplier";

let SUPPLIERS: Supplier[] = []
for (let index = 1; index < 8; index++) {
    SUPPLIERS.push(
        {
            id: index,
            nombre: `Supplier ${index}`,
            email: `supplier${index}@email.com`,
            direccion: `Address ${index}`
        }
    )
}

export { SUPPLIERS }