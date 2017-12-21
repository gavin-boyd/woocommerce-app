import { Component, OnInit } from '@angular/core';
import { WooApiModule, WooApiService } from 'ng2woo';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

	products: any;
  private dataAvailable:boolean = false;
  title: any;
  description: string;
  private order: any = [];

  constructor(private woo: WooApiService) { }

  ngOnInit(): void {

    var promise = this.woo.fetchItems('products/408');

    var thenProm = promise.then((products) => {
      this.products = products;
      this.dataAvailable = true;
      console.log(this.products);
    });

    promise.catch(function(error) {
      console.log(error);
    });
  }

  onSubmit() {
    console.log('Tester');
  }
}