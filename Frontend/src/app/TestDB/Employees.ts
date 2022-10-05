import { Employee } from "../Interfaces/Employee";

const EMPLOYEES: Employee[] = [
    {
        "id": 1,
        "name": "John",
        "lastName": "Doe",
        "email": "JohnDoe@email.com",
        "age": 25,
        "birthDate": new Date(),
        "startingDate": new Date(),
        "position": "Developer",
        "paymentFrequency": "Monthly"
    },
    {
        "id": 2,
        "name": "Jane",
        "lastName": "Doe",
        "email": "JaneDoe@email.com",
        "age": 25,
        "birthDate": new Date(),
        "startingDate": new Date(),
        "position": "Developer",
        "paymentFrequency": "Weekly"
    },
    {
        "id": 3,
        "name": "John",
        "lastName": "Smith",
        "email": "JohnSmith@email.com",
        "age": 25,
        "birthDate": new Date(),
        "startingDate": new Date(),
        "position": "Developer",
        "paymentFrequency": "Biweekly"

    },
    {
        "id": 4,
        "name": "Jane",
        "lastName": "Smith",
        "email": "JaneSmith@email.com",
        "age": 25,
        "birthDate": new Date(),
        "startingDate": new Date(),
        "position": "Developer",
        "paymentFrequency": "Monthly"
    }
]

export { EMPLOYEES }