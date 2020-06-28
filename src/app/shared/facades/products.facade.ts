import { Notification, NotificationType, PriorityType } from './../models/notification.model';
import { AppStore } from './../stores/app.store';
import { ProductService } from './../services/products.service';
import { ProductActions } from './../actions/product.action';
import { Product } from './../entities/product.entity';
import { ProductStore } from './../stores/product.store';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Status } from 'rxjs-reactive-state';
import { switchMap, finalize } from 'rxjs/operators';
import { callbackify } from 'util';

@Injectable()
export class ProductsFacade {

  constructor(private store: ProductStore, private service: ProductService, private appStore: AppStore) { }

  add = (product: Product, callback: () => void) => {
    this.store.setAction(ProductActions.CREATE);

    this.service.add(product)
    .pipe(
      switchMap(
        (id) => {
          return this.service.getById(id);
        }
      ),
      finalize(() => callback())
    )
    .subscribe(
      (response: Product) => {
        this.store.setStatus(Status.SUCCESS);
        this.store.addOne(response);

        const notification = new Notification(NotificationType.SUCCESS, 'Product added');
        this.notify(notification);
      },
      this.handleError
    );
  }

  updateById = (id: number, product: Product): void => {
    this.store.setAction(ProductActions.UPDATE);

    this.service.update(id, product).subscribe(
      () => {
        this.store.setStatus(Status.SUCCESS);
        this.store.updateById(id, product);

        const notification = new Notification(NotificationType.SUCCESS, 'Product updated');
        this.notify(notification);
      },
      this.handleError
    );
  }

  deleteById = (id: number, callback: () => void): void => {
    this.store.setAction(ProductActions.DELETE);

    this.service.delete(id)
    .pipe(
      finalize(() => callback())
    )
    .subscribe(
      () => {
        this.store.setStatus(Status.SUCCESS);
        this.store.deleteById(id);

        const notification = new Notification(NotificationType.SUCCESS, 'Product deleted', PriorityType.HIGH);
        this.notify(notification);
      },
      this.handleError
    );
  }

  setEntities = () => {
    this.store.setAction(ProductActions.GET_ALL);

    this.service.getAll().subscribe(
      (entities: Product[]) => {
        this.store.setStatus(Status.SUCCESS);
        this.store.setEntities(entities);
      },
      this.handleError
    );
  }

  setSelected = (id: number): void => this.store.setSelected(id);

  getAll$ = (): Observable<Product[]> => this.store.getAll$();

  searchByName$ = (partialName: string): Observable<Product[]> => this.store.searchByName$(partialName);

  getSelected$ = (): Observable<Product> => this.store.getSelected$();

  handleError = (error: any) => {
    this.store.setStatus(Status.FAILED);
    this.store.setErrors(error);

    const notification = new Notification(NotificationType.ERROR, error.message);
    this.notify(notification);
  }

  getAction$ = () => this.store.getAction$();

  getStatus$ = () => this.store.getStatus$();

  notify(notification: Notification) {
    this.appStore.setNotification(notification);
  }

}
