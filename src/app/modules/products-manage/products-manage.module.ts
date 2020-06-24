import { ProductStore } from './../../shared/stores/product.store';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsManageRoutingModule } from './products-manage-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [ProductListComponent],
  imports: [
    CommonModule,
    ProductsManageRoutingModule,
    SharedModule,
  ],
  providers: [
    ProductStore
  ]
})
export class ProductsManageModule { }
