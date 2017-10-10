import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ProductComponent } from './product/product.component';
import { RouterModule, Routes } from '@angular/router';
import { WooApiModule, WooApiService } from 'ng2woo';

const WooCommerceConfig = {
  url: 'https://lovestorey.uk',
  consumerKey: '',
  consumerSecret: '',
  wpAPI: true,
  version: 'wc/v1',
  queryStringAuth: true
};

const appRoutes: Routes = [
  {
    path: 'product',
    component: ProductComponent
  },
  {
    path: 'home',
    component: ProductComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    WooApiModule.forRoot(WooCommerceConfig)
  ],
  providers: [
    WooApiService
  ],
  bootstrap: [
    ProductComponent
  ]
})
export class AppModule { }