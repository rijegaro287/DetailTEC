import { Client } from "../Interfaces/client";

const  CLIENTS: Client[] = [
    {
        "id": 1,
        "username": "user1",
        "email": "yraulbr@gmail.com",
        "name": "Raul",
        "lastname1": "Yañez",
        "lastname2": "Bermudez",
        "phone": [305230771, 305230772],
        "address": ["Calle 1", "Calle 2"],
        "password": "1234",
        "puntos": 100
    },
    {
        "id": 2,
        "username": "user2",
        "email": "ybrenesr@estuadiantec.cr",
        "name": "Ricardo",
        "lastname1": "Brenes",
        "lastname2": "Rojas",
        "phone": [305230773, 305230774],
        "address": ["Calle 3", "Calle 4"],
        "password": "1234",
        "puntos": 200
    },
    {
        "id": 3,
        "username": "user3",
        "email": "quadriana@hotmail.com",
        "name": "Ana",
        "lastname1": "Quirós",
        "lastname2": "Díaz",
        "phone": [305230775, 305230776],
        "address": ["Calle 5", "Calle 6"],
        "password": "1234",
        "puntos": 300
    }
]

export {CLIENTS}