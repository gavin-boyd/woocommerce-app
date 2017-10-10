import { Component, OnInit } from '@angular/core';
import { WooApiModule, WooApiService } from 'ng2woo';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

	products: any;

  constructor(private woo: WooApiService) { }

  ngOnInit(): void {
  	//Fetch all products
    this.woo.fetchItems('products/408').then(
      products => console.log(products)
    );
  }
}