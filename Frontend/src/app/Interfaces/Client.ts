interface Client {
    id: number
    usuario: string
    nombre: string
    apellido1: string
    apellido2: string
    email: string
    telefonos: number[]
    direcciones: string[]
    total: number
    utilizados: number
    actuales: number
}

export { Client }