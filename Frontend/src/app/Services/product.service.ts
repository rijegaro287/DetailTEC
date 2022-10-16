import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Product } from '../Interfaces/Product';
import { AllProductsResponse, ServerResponse, ProductResponse } from '../Interfaces/ServerResponses';

import { PRODUCTS } from '../TestDB/Products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor() { }

  getAllProducts = (): Observable<AllProductsResponse> => {
    const okResponse: AllProductsResponse = {
      status: 'ok',
      products: PRODUCTS
    }

    const errorResponse: ServerResponse = {
      status: 'error',
      message: 'No se pudieron obtener los productos'
    }

    return of(okResponse)
  }

  getProduct = (name: string): Observable<ProductResponse> => {
    const product: Product = PRODUCTS.find(product => product.nombre === name)!

    const okResponse: ProductResponse = {
      status: 'ok',
      product: product
    }

    const errorResponse: ServerResponse = {
      status: 'error',
      message: 'No se pudo obtener el producto'
    }

    return of(okResponse)
  }
}
