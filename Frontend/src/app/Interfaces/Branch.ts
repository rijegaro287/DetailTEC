interface Branch {
    id: number
    nombre: string
    provincia: string
    canton: string
    distrito: string
    telefono: number
    idGerente: number
    nombreGerente?: string
    apellidoGerente?: string
    fechaApertura: string
    fechaInicioGerente: string
}

export { Branch }