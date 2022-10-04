interface TableHead<Type> {
    field: keyof Type;
    header: string
}

export { TableHead }