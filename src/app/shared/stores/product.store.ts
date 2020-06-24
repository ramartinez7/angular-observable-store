import { AppState } from './../states/app.state';
import { Product } from 'src/app/shared/entities';
import { ProductState } from './../states/product.state';
import { EntityStore } from 'rxjs-reactive-state';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

function getInitialState(): ProductState {
  return new ProductState();
}

@Injectable()
export class ProductStore extends EntityStore<ProductState, Product> {

  observer$: Observable<ProductState>;

  constructor() {
    super(getInitialState());
  }

  add = (product: Product): void => this.add(product);

  updateById = (id: number, product: Product): void => this.update(p => p.Id === id, product);

  deleteById = (id: number): void => this.remove(p => p.Id === id);

  getAll$ = (): Observable<Product[]> => this.listen$('entities');

  getById$ = (id: number): Observable<Product> => this.listen$(state => state.entities.find(e => e.Id === id));

}
