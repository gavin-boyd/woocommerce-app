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

  constructor(private woo: WooApiService) { }

  ngOnInit(): void {

    var promise = this.woo.fetchItems('products/408');
    var name = [];

    var thenProm = promise.then((products) => {
      this.products = products;
      this.dataAvailable = true;
      console.log(this.products.name);
    });

    promise.catch(function(error) {
      console.log(error);
    });

    this.title = 'tester';
    //console.log('----------------------------' + this.products);   
  }
}

//ES6 arrow functions