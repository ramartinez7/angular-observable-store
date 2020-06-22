import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { cloneDeep } from 'lodash';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { customFn, ReturnTypes } from '../types';
import { compareKeys, isFunction, isString } from '../functions';

export class Store<T> {
    protected state$: BehaviorSubject<T>;
    public observer$: Observable<T>;

    constructor(initialState: T) {
        this.state$ = new BehaviorSubject(initialState);
        this.observer$ = this.state$.asObservable();
    }

    /**
     * Returns the value of the store
     */
    public get state(): T {
        return this.state$.getValue();
    }

    /**
     * Set the value of the store
     * @example
     *  this.store.dispatch({ products: products })
     */
    public dispatch(object: Partial<T>): void;

    /**
     * Set the value of the store, using the store's value in a function
     * @example
     * this.store.dispatch(state => {
     *   return {...}
     * })
     */
    // tslint:disable-next-line: unified-signatures
    public dispatch(callback: customFn<T>): void;

    /**
     * Generic setter with argument as T or callback which recieve state as argument,
     * The update(callback) option gives you more control. It receives a callback function, which gets the current state,
     * and returns a new immutable state, which will be the new value of the store.
     */
    // public dispatch(next: any): void {
    //     const s = typeof next === 'function' ? next(this.state) : next;
    //     this.state$.next(cloneDeep(s));
    // }

    public dispatch(next: (customFn<T> | Partial<T>)) {
        let state: T;

        if (isFunction(next)) {
            state = (next as customFn<T>)(this.state);
        } else {
            state = {
                ...this.state,
                ...(next as Partial<T>)
            };
        }

        this.state$.next(cloneDeep(state));

        if (environment.logState) {
            console.log(this.state);
        }
    }

    /**
     * Generic getter function to obtain data from state, returns an observable
     * Select a slice from the store
     *
     * @example
     *
     * this.query.select()
     * this.query.select(state => state.entities)
     * this.query.select('products');
     * this.query.select(['name', 'email'])
     */
    select$<R extends keyof T>(key: R): Observable<T[R]>;
    // Pick<T, K>: Constructs a type by picking the set of properties K from T.
    select$<K extends keyof T>(stateKeys: K[]): Observable<Pick<T, K>>;
    select$<R>(fn: (store: T) => R): Observable<R>;
    select$<R extends [(state: T) => any] | Array<(state: T) => any>>(selectorFns: R): Observable<ReturnTypes<R>>;
    select$(): Observable<T>;

    select$<R>(arg?: ((state: T) => R) | keyof T | (keyof T)[] | ((state: T) => any)[]) {
        let mapFn;
        if (isFunction(arg)) {
            mapFn = arg;
        } else if (isString(arg)) {
            mapFn = state => state[arg];
        } else if (Array.isArray(arg)) {
            return this.observer$.pipe(
                distinctUntilChanged(compareKeys(arg)),
                map(state => {

                    if (isFunction(arg[0])) {
                        return (arg as ((state: T) => any)[]).map(
                            func => func(state)
                        );
                    }

                    // reduce: applies a function to every element
                    // acc: accumulator
                    // k: element
                    // response: {[key: keyof T]: state[key]}
                    return ([...new Set(arg as (keyof T)[])]).reduce(
                        (acc, k) => {
                            acc[k as any] = state[k];
                            return acc;
                        }
                    );
                })
            );
        } else {
            mapFn = state => state;
        }

        return this.observer$.pipe(
            map(mapFn)
        );
    }

    public destroy() {
        this.state$.complete();
    }
}


