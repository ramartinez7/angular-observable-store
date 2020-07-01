import { ProductActions } from './../../../shared/actions/product.action';
import { Status } from 'rxjs-reactive-state';
import { ProductsFacade } from './../../../shared/facades/products.facade';
import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Product } from 'src/app/shared/entities';
import { Observable, forkJoin, combineLatest, Subject, Subscription } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { debounceTime, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent implements OnInit, OnDestroy {

  subscriptions = new Array<Subscription>();

  listOfData = new Subject<Product[]>();
  listOfData$ = this.listOfData.asObservable();

  tempListOfData: Observable<Product[]>;

  gettingData: boolean;

  showCreateModal = false;
  showUpdateModal = false;

  searchField = new FormControl('');
  searchForm: FormGroup = this.fb.group({search: this.searchField});

  constructor(private facade: ProductsFacade, private message: NzMessageService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.subscriptions.push(combineLatest([this.facade.getAction$(), this.facade.getStatus$()]).subscribe(
      ([action, status]) => {
        if (action && status) {
          this.gettingData = action === ProductActions.GET_ALL && status === Status.LOADING;
        }
      }
    ));

    this.setEntities();

    this.subscriptions.push(this.facade.getAll$().subscribe(
      list => this.listOfData.next(list)
    ));

    this.subscriptions.push(this.searchField.valueChanges.pipe(
      debounceTime(300),
      switchMap(text => this.facade.searchByName$(text))
    ).subscribe(
      list => this.listOfData.next(list)
    ));

    this.subscriptions.push(this.facade.mapper().subscribe(
      res => console.log(res)
    ));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  setEntities() {
    this.facade.setEntities();
  }

  selectProduct(id: number) {
    this.facade.setSelected(id);
  }

  delete(id: number) {
    const idIndicator = this.showActionIndicator('Removal');
    this.facade.deleteById(id, () => this.message.remove(idIndicator));
  }

  showActionIndicator(text: string): string {
    const id = this.message.loading(text + ' in progress..', { nzDuration: 0 }).messageId;
    return id;
  }

}
