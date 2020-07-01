import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ProductsFacade } from 'src/app/shared/facades/products.facade';
import { take } from 'rxjs/operators';
import { Product } from 'src/app/shared/entities';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.scss']
})
export class ProductUpdateComponent implements OnInit, OnDestroy {

  @Input() isVisible = false;
  @Output() closed = new EventEmitter();
  updateProductForm: FormGroup;
  updating = false;

  subscriptions = new Array<Subscription>();

  constructor(private fb: FormBuilder, private facade: ProductsFacade) { }

  ngOnInit(): void {
    this.updateProductForm = this.fb.group({
      Id: [],
      Name: ['', [Validators.required]],
      Detail: ['', [Validators.required]],
      Price: [1, [Validators.required]],
      Stock: [0, [Validators.required]]
    });

    this.subscriptions.push(this.facade.getSelected$().subscribe(
      product => {
        if (product){
          this.updateProductForm.patchValue(product);
        }
      }
    ));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  handleOk(): void {
    if (!this.updateProductForm.valid) {
      for (const i in this.updateProductForm.controls) {
        if (i) {
          this.updateProductForm.controls[i].markAsDirty();
          this.updateProductForm.controls[i].updateValueAndValidity();
        }
      }
    } else {
      const product = this.updateProductForm.value as Product;
      this.updating = true;
      this.updateProductForm.disable();
      this.facade.updateById(product.Id, product, this.close.bind(this));
    }
  }

  close(): void {
    this.isVisible = false;
    this.updating = false;
    this.updateProductForm.enable();
    this.updateProductForm.reset();
    this.closed.emit();
  }

}
