interface Product {
    id: number
    nombre: string
    marca: string
    costo: number // Faltaba este
    precio: number
    idProveedor: number
    nombreProveedor?: string
}

export { Product }