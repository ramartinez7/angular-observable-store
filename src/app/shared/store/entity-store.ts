import { Store } from './store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';
import { EntityState, Action, Status } from '../types';
import { Product } from '../entities';

/**
 * Store for entities
 *
 * Constraint applied on type Parameter S to be only EntityState<T> type:
 *
 * S = EntityState<Entity>
 * T = Entity
 */

export class EntityStore<S extends EntityState<T>, T> extends Store<S> {

  observer$: Observable<S>;

  constructor(initialState: S) {
    super(initialState);
  }

  public add(m: T | T[]) {
    const entities = [...this.state.entities.concat(m)];
    this.dispatchEntities(entities);
  }

  public update(fn: (entity: T) => boolean, entity: T): void {
    const idx = this.state?.entities?.findIndex(fn);

    if (idx === -1) {
      return;
    }
    // found, so entities equal to:
    // Clone of items before item being update.
    // updated item
    // Clone of items after item being updated.
    const entities = [...this.state?.entities?.slice(0, idx), entity, ...this.state?.entities?.slice(idx + 1)];
    this.dispatchEntities(entities);
  }

  public remove(fn: (entity: T) => boolean): void {
    const idx = this.state?.entities?.findIndex(fn);
    if (idx === -1) {
      return;
    }
    // found, so entities equal to: clone of items before and clone of items after.
    const entities = [...this.state?.entities?.slice(0, idx), ...this.state?.entities?.slice((idx || 0) + 1)];
    this.dispatchEntities(entities);
  }

  public exists(fn: (entity: T) => boolean): boolean {
    return this.state?.entities?.some(fn) || false;
  }

  public setSelectedElement(selected: T): void {
    const state: S = {
      ...(this.state),
      selected
    };
    this.dispatch(state);
  }

  /** By default actions start with status loading */
  public setAction(action: Action) {
    const state: S = {
      ...(this.state),
      action,
      status: Status.LOADING
    };
    this.dispatch(state);
  }

  public setStatus(status: Status) {
    const state: S = {
      ...(this.state),
      status
    };
    this.dispatch(state);
  }

  public setActionStatus(actionStatus: { action: Action, status: Status }) {
    this.dispatch(actionStatus as Partial<S>);
  }

  private dispatchEntities(entities: T[]) {
    this.dispatch({ ...this.state, entities });
  }
}
