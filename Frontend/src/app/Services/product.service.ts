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

  getAllProducts = (): Observable<ProductsResponse> =>
    this.httpClient.get<ProductsResponse>(`${this.url}/get_all`)

  getProduct = (id: number): Observable<ProductResponse> =>
    this.httpClient.get<ProductResponse>(`${this.url}/get/${id}`)

  createProduct = (product: any): Observable<ServerResponse> => {
    product.id = product.id.toString()

    return this.httpClient.post<ServerResponse>(`${this.url}/add`, product)
  }

  updateProduct = (productID: number, product: any): Observable<ServerResponse> => {
    product.id = product.id.toString()

    return this.httpClient.patch<ServerResponse>(`${this.url}/update/${productID}`, product)
  }

  deleteProduct = (id: number): Observable<ServerResponse> =>
    this.httpClient.delete<ServerResponse>(`${this.url}/delete/${id}`)
}
