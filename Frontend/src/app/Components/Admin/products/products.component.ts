import { Component, OnInit } from '@angular/core'

import { KeyReplacement } from 'src/app/Interfaces/Auxiliaries'
import { Product } from 'src/app/Interfaces/Product'

import { MessageService } from 'src/app/Services/message.service'
import { ProductService } from 'src/app/Services/product.service'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class AdminProductsComponent implements OnInit {
  tableColumns: KeyReplacement<Product>[]
  tableData: Product[]

  constructor(
    private productService: ProductService,
    protected messageService: MessageService
  ) {
    this.tableColumns = [
      { key: "nombre", replacement: "Nombre" },
      { key: "marca", replacement: "Marca" },
      { key: "nombreProveedor", replacement: "Proveedor" },
      { key: "precio", replacement: "Precio" }
    ]

    this.tableData = []
  }

  ngOnInit(): void {
    this.messageService.resetMessageInfo()

    this.productService.getAllProducts()
      .subscribe(response => {
        if (response.status === 'error') {
          this.messageService.setMessageInfo(response.message!, 'error')
        }
        else if (response.products) {
          this.tableData = response.products
        }
        else {
          console.log(response)
        }
      })
  }
}
