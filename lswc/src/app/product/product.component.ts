import { Component, OnInit } from '@angular/core';
import { WooApiModule, WooApiService } from 'ng2woo';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

	//products: any;
  title:string = 'Hello World';
  description:string = '';

  constructor(private woo: WooApiService) { }

  ngOnInit(): void {

    var promise = this.woo.fetchItems('products/408');

    promise.then(function(product) {
      console.log('Successfully got ' + product.name);
      console.log(product);
    });

    promise.catch(function(error) {
      console.log(error);
    });

    //this.title = 'test';
  }
}