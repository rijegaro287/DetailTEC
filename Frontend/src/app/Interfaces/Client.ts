interface Client {
    id: number
    usuario: string
    nombre: string
    apellido: string
    email: string
    telefonos: number[]
    direcciones: string[]
    puntos: number
}

interface ClientCulo {
    id: number;
    username: string;
    email: string;
    name: string;
    lastname1: string;
    lastname2: string;
    phone: number[];
    address: string[];
    password: string;
    puntos: number;
}

export { Client, ClientCulo }