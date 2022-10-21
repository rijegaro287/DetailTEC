interface Product {
    nombre: string
    marca: string
    costo: number // Faltaba este
    precio: number
    idProveedor: number
    nombreProveedor?: string
}

export { Product }