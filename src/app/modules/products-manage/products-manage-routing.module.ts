import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';


const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: 'list'
  },
  { path: 'list', component: ProductListComponent, data: { breadcrumb: 'List' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsManageRoutingModule { }
