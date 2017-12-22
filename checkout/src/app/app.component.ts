import { Component, OnInit, Input, ViewChild, Directive, Renderer, ElementRef, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { HttpClient } from '@angular/common/http';

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
  minDate = new Date();
  rushOrderMessage: string = '';
  rush = 'false';
  counter = 0;

  public didPaypalScriptLoad: boolean = false;
  public loading: boolean = true;

  public paypalConfig: any = {
    env: 'sandbox',
    client: {
      sandbox: 'AWlMGZwpQbS0dq_r2Dt0ejp1TxDm72JD7Pt4Uc2mYlihAE3FU5axxS9wr4HcnVc13gB7TcbYDVLp9Vne',
      production: 'xxxxxxxxxx'
    },
    commit: true,
    payment: (data, actions) => {
      return actions.payment.create({
        payment: {
          transactions: [
            {
              amount: {
                total: this.totalCost + '.00',
                currency: 'GBP'
              },
              description: "The payment transaction description."
            }
          ]
        }
      });
    },
    onAuthorize: (data, actions) => {
      // show success page
    }
  };

  public ngAfterViewChecked(): void {
    if(!this.didPaypalScriptLoad) {
      this.loadPaypalScript().then(() => {
        paypal.Button.render(this.paypalConfig, '#paypal-button');
        this.loading = false;
      });
    }
  }

  public loadPaypalScript(): Promise<any> {
    this.didPaypalScriptLoad = true;
    return new Promise((resolve, reject) => {
      const scriptElement = document.createElement('script');
      scriptElement.src = 'https://www.paypalobjects.com/api/checkout.js';
      scriptElement.onload = resolve;
      document.body.appendChild(scriptElement);
    });
  }

  constructor(
    private _formBuilder: FormBuilder,
    public http: HttpClient
  ) {}

  @ViewChild('total') total: ElementRef;

  //function
  apiEndPoint(type) {
    var url = 'https://lovestorey.uk/wp-json/wc/v1/' + type + '?queryStringAuth=true&oauth_consumer_secret=cs_425af14732738872e1a02fb690b312692e2d0cbe&oauth_consumer_key=ck_77b95f7dc0b88ffe1d5cef225ec5dabe3550e171';
    return url;
  }

  ngOnInit(): void {

    //api testing
    console.log(this.apiEndPoint('products'));
    //var req = this.http.get(this.apiEndPoint('products'));
    //console.log(req);

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

  dateSelect(type: string, event: MatDatepickerInputEvent<Date>) {
    const originalCost = this.totalCost;
    var selectedDate = new Date(event.value);
    var today = new Date();
    var timeDiff = Math.abs(selectedDate.getTime() - today.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    if (diffDays < 7 && this.rush == 'false') {
      this.rush = 'true';
      this.totalCost = originalCost + 30;
      this.rushOrderMessage = 'A rush order fee of +£30 is applied';
    }
    if (diffDays > 7 && this.rush == 'true') {
      this.rush = 'false';
      this.totalCost = originalCost - 30;
      this.rushOrderMessage = '';
    }
  }

  buyNow() {
    WooCommerce.post('products', data, function(err, data, res) {
      console.log(res);
    });
    this.http.post(this.apiEndPoint('products'));
  }
}
