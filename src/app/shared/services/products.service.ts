import { Product } from 'src/app/shared/entities';
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ProductService {

  headers = new HttpHeaders(
    {
        'Content-Type': 'application/json',
    }
  );

  constructor(private http: HttpClient) {}

  getAll = () => this.http.get<Product[]>('products', { headers: this.headers });

  getById = (id: number) => this.http.get<Product>(`products/${id}`, { headers: this.headers });

  add = (product: Product) => this.http.post<Product>('products', product, { headers: this.headers });

  update = (id: number, product: Product) => this.http.put(`products/${id}`, product, {headers: this.headers});

  delete = (id: number) => this.http.delete(`products/${id}`, { headers: this.headers });

}
