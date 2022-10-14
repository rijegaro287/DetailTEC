import { Product } from "../Interfaces/Product"

const PRODUCTS: Product[] = []
for (let index = 1; index < 8; index++) {
    PRODUCTS.push({
        nombre: `Producto ${index}`,
        marca: `Marca ${index}`,
        precio: index * 1275,
        idProveedor: index,
        nombreProveedor: `Proveedor ${index}`
    })
}
export { PRODUCTS }