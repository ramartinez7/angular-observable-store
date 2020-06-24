import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotfoundComponent } from './shared/components/notfound/notfound.component';


const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  {
    path: 'products',
    data: {
      breadcrumb: 'Products'
    },
    loadChildren: async () => (await import('./modules/products-manage/products-manage.module')).ProductsManageModule
  },
  { path: '404', component: NotfoundComponent },
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
