import { ProductCreateComponent } from './product-create/product-create.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';


const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: 'list'
  },
  { path: 'list', component: ProductListComponent, data: { breadcrumb: 'List' } },
  { path: 'create', component: ProductCreateComponent, data: { breadcrumb: 'Create' }},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsManageRoutingModule { }
