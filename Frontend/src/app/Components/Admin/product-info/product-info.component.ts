import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { KeyReplacement } from 'src/app/Interfaces/Auxiliaries'
import { Product } from 'src/app/Interfaces/Product'

import { MessageService } from 'src/app/Services/message.service'
import { ProductService } from 'src/app/Services/product.service'

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss']
})
export class AdminProductInfoComponent implements OnInit {
  productInfoTitles: KeyReplacement<Product>[]
  product: Product

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    protected messageService: MessageService
  ) {
    this.productInfoTitles = [
      { key: "nombre", replacement: "Nombre" },
      { key: "marca", replacement: "Marca" },
      { key: "precio", replacement: "Precio" },
      { key: "nombreProveedor", replacement: "Proveedor" }
    ]

    this.product = {} as Product
  }

  ngOnInit(): void {
    const name = this.route.snapshot.paramMap.get('name')!
    this.productService.getProduct(name)
      .subscribe(response => {
        if (response.status === 'error') {
          this.messageService.setMessageInfo(response.message!, 'error')
        }
        else if (response.product) {
          this.product = response.product
        }
        else {
          console.log(response)
        }
      })
  }
}
