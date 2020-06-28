import { ProductsFacade } from './../../../shared/facades/products.facade';
import { Product } from './../../../shared/entities/product.entity';
import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCreateComponent implements OnInit {

  @Input() isVisible = false;
  @Output() closed = new EventEmitter();
  createProductForm: FormGroup;
  creating = false;

  subscriptions: Subscription[];

  constructor(private fb: FormBuilder, private facade: ProductsFacade) {}

  ngOnInit(): void {
    this.createProductForm = this.fb.group({
      Name: ['', [Validators.required]],
      Detail: ['', [Validators.required]],
      Price: [1, [Validators.required]],
      Stock: [0, [Validators.required]]
    });
  }

  handleOk(): void {
    if (!this.createProductForm.valid) {
      for (const i in this.createProductForm.controls) {
        if (i) {
          this.createProductForm.controls[i].markAsDirty();
          this.createProductForm.controls[i].updateValueAndValidity();
        }
      }
    } else {
      const product = this.createProductForm.value as Product;
      this.creating = true;
      this.createProductForm.disable();
      this.facade.add(product, this.close.bind(this));
    }
  }

  close(): void {
    this.isVisible = false;
    this.creating = false;
    this.createProductForm.enable();
    this.createProductForm.reset();
    this.closed.emit();
  }

}
