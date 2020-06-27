import { Product } from 'src/app/shared/entities';
import { EntityState } from 'rxjs-reactive-state';

export class ProductState extends EntityState<Product> {
  customProperty: string[];
}
