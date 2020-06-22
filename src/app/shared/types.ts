export type customFn<T> = (s: T) => T;
export type ArrayFuncs = ((...a: any[]) => any)[];
export type ReturnTypes<T extends ArrayFuncs> = { [P in keyof T]: T[P] extends ( ...a: any[]) => infer R ? R : never };

export class EntityState<T> {
  entities?: Array<T> = [];
  selected?: T;
  status?: Status;
  action?: Action;
  error?: any;
  [key: string]: any;

  constructor(entities: Array<T> = [], selected?: T) {
      this.entities = entities;
      this.selected = selected;
  }
}

export enum Status {
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
  LOADING = 'LOADING',
  COMPLETE = 'COMPLETE'
}


/* Actions */

export enum ProductActions {
  GET_ALL = 'GET_ALL',
  GET_BY_ID = 'GET_BY_ID',
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  SOFT_DELETE = 'SOFT_DELETE'
}

export type Action = ProductActions; // | CustomerActions | OrderItemsActions | etc..

/* End Actions */
