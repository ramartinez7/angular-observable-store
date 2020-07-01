import { ProductsFacade } from './../../shared/facades/products.facade';
import { ProductService } from './../../shared/services/products.service';
import { ProductStore } from './../../shared/stores/product.store';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsManageRoutingModule } from './products-manage-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductUpdateComponent } from './product-update/product-update.component';


@NgModule({
  declarations: [ProductListComponent, ProductCreateComponent, ProductUpdateComponent],
  imports: [
    CommonModule,
    ProductsManageRoutingModule,
    SharedModule,
  ],
  providers: [
    ProductStore,
    ProductService,
    ProductsFacade
  ]
})
export class ProductsManageModule { }
