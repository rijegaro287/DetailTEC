import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

import {
  ServerResponse,
  ProductsResponse,
  ProductResponse
} from '../Interfaces/ServerResponses'

import { apiURL } from '../app.component'

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url = `${apiURL}/producto`

  constructor(
    private httpClient: HttpClient
  ) { }

  /** Solicita al servidor todos los productos */
  getAllProducts = (): Observable<ProductsResponse> =>
    this.httpClient.get<ProductsResponse>(`${this.url}/get_all`)

  /**
   * Solicita al servidor un producto dado su ID
   * @param id ID del producto
   * @returns Objeto con la información del producto
  */
  getProduct = (id: number): Observable<ProductResponse> =>
    this.httpClient.get<ProductResponse>(`${this.url}/get/${id}`)

  /**
   * Solicita al servidor que cree un nuevo producto
   * @param product Objeto con la información del producto
   * @returns Objeto con respuesta del servidor
  */
  createProduct = (product: any): Observable<ServerResponse> => {
    product.id = product.id.toString()

    return this.httpClient.post<ServerResponse>(`${this.url}/add`, product)
  }

  /**
   * Solicita al servidor que actualice un producto
   * @param productID ID del producto
   * @param product Objeto con la información del producto
   * @returns Objeto con respuesta del servidor
  */
  updateProduct = (productID: number, product: any): Observable<ServerResponse> => {
    product.id = product.id.toString()

    return this.httpClient.patch<ServerResponse>(`${this.url}/update/${productID}`, product)
  }

  /**
   * Solicita al servidor que elimine un producto
   * @param id ID del producto
   * @returns Objeto con respuesta del servidor
  */
  deleteProduct = (id: number): Observable<ServerResponse> =>
    this.httpClient.delete<ServerResponse>(`${this.url}/delete/${id}`)
}
