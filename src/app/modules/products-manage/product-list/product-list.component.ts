import { ProductActions } from './../../../shared/actions/product.action';
import { Status } from 'rxjs-reactive-state';
import { ProductsFacade } from './../../../shared/facades/products.facade';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Product } from 'src/app/shared/entities';
import { Observable, forkJoin, combineLatest } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent implements OnInit {

  listOfData: Observable<Product[]> = this.facade.getAll$();

  gettingData: boolean;

  constructor(private facade: ProductsFacade) { }

  ngOnInit(): void {
    combineLatest([this.facade.getAction$(), this.facade.getStatus$()]).subscribe(
      ([action, status]) => {
        if (action && status) {
          this.gettingData = action === ProductActions.GET_ALL && status === Status.LOADING;
        }
      }
    );

    this.facade.setEntities();
  }

}
