import { environment } from 'src/environments/environment';
import { Product } from 'src/app/shared/entities';
import { ProductState } from './../states/product.state';
import { EntityStore, Status } from 'rxjs-reactive-state';
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
    this.logActions = environment.logState;
  }

  add = (product: Product): void => this.add(product);

  updateById = (id: number, product: Product): void => this.update(p => p.Id === id, product);

  deleteById = (id: number): void => this.remove(p => p.Id === id);

  setEntities = (entities: Product[]) => this.change({entities});

  setSelected = (id: number): void => {
    const entity = this.state.entities.find( e => e.Id === id);
    this.change({
      selected: {
        ...entity
      }
    });
  }

  getAll$ = (): Observable<Product[]> => this.listen$('entities');

  getSelected$ = (): Observable<Product> => this.listen$(state => state.selected);

  getAction$ = (): Observable<string> => this.listen$('action');

  getStatus$ = (): Observable<Status> => this.listen$('status');

  setErrors = (error: any) => this.change({error});

}
