import { Component, OnInit, Input, ViewChild, Directive, Renderer, ElementRef, Injectable } from '@angular/core';
import { WooApiService } from 'ng2woo';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  totalCost: number = 0;
  headTableModel: string;
  isLinear = 'true';
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  constructor(
    private woo: WooApiService,
    private _formBuilder: FormBuilder
  ) {}

  @ViewChild('total') total: ElementRef;

  ngOnInit(): void {
    // Fetch all products
    /*this.woo.fetchItems('products')
      .then(products => console.log(products));*/

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required]
    });
  }

  calcPrice(event: any, quantity) {
    //var quantity = event.value;

    if (quantity < 16) {
      var price = 5.5;
    }

    if (quantity > 15 && quantity < 26) {
      var price = 5.25;
    }

    if (quantity > 25) {
      var price = 5;
    }

    this.totalCost = quantity * price;

    console.log('Cost:' + this.totalCost);
  }

  headTableSel(event:any) {
    var choice = event.value;
    if (choice == 'Yes') {
      this.totalCost = this.totalCost + 20;
    }
    if (choice == 'No') {
      this.totalCost = this.totalCost - 20;
    }
  }
}
