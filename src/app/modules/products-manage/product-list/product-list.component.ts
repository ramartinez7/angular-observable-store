import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/entities';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  listOfData: Product[] = [
    {
      Id: 1,
      Name: 'Product 1',
      Price: 2500,
      Stock: 15
    },
    {
      Id: 1,
      Name: 'Product 2',
      Price: 3500,
      Stock: 14
    },
    {
      Id: 1,
      Name: 'Product 3',
      Price: 1500,
      Stock: 30
    },
    {
      Id: 1,
      Name: 'Product 4',
      Price: 5000,
      Stock: 1
    },
    {
      Id: 1,
      Name: 'Product 5',
      Price: 6500,
      Stock: 10
    },
    {
      Id: 1,
      Name: 'Product 6',
      Detail: '',
      Price: 500,
      Stock: 5
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
