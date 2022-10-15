import { WashingType } from "../Interfaces/WashingType";

const WASHINGTYPES: WashingType[] = [
    {
        nombre: 'Lavado y aspirado',
        costo: 1000,
        precio: 1500,
        duracionMinutos: 30,
        nombresProductos: ['Producto 1', 'Producto 2', 'Producto 3'],
        puntuacion: 100
    },
    {
        nombre: 'Lavado y encerado',
        costo: 1500,
        precio: 2000,
        duracionMinutos: 45,
        nombresProductos: ['Producto 3', 'Producto 4', 'Producto 5'],
        puntuacion: 200
    },
    {
        nombre: 'Lavado premium',
        costo: 2000,
        precio: 3000,
        duracionMinutos: 60,
        nombresProductos: ['Producto 3', 'Producto 4', 'Producto 5', 'Producto 6'],
        puntuacion: 350
    },
    {
        nombre: 'Pulido',
        costo: 1500,
        precio: 2200,
        duracionMinutos: 40,
        nombresProductos: ['Producto 6', 'Producto 7'],
        puntuacion: 350
    },
]

export { WASHINGTYPES }