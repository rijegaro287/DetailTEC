import { Branch } from "../Interfaces/Branch";

const BRANCHES: Branch[] = []

for (let index = 0; index < 6; index++) {
    BRANCHES.push(
        {
            id: index,
            nombre: `Sede ${index}`,
            provincia: `Provincia ${index}`,
            canton: `Cantón ${index}`,
            distrito: `Distrito ${index}`,
            telefono: index * 10,
            idGerente: index + 1,
            nombreGerente: `Nombre ${index}`,
            fechaApertura: new Date().toISOString().split('T')[0],
            fechaInicioGerente: new Date().toISOString().split('T')[0],
        }
    )
}

export { BRANCHES }