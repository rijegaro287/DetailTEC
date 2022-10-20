interface Client {
    id: number
    usuario: string
    nombre: string
    apellido: string
    email: string
    telefonos: number[]
    direcciones: string[]
    puntos?: ClientPoints // Cambio
}

interface ClientPoints {
    total: number
    utilizados: number
}

export { Client }