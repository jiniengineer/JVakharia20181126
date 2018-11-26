import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { Store, select } from '@ngrx/store';
import { tap, filter, take, switchMap, catchError } from 'rxjs/operators';

import * as fromStore from '../../state';
import { Observable, of } from 'rxjs';

@Injectable()
export class OrdersGuard implements CanActivate {
  constructor(private store: Store<fromStore.OrderModuleState>) {}

  canActivate(): Observable<boolean> {
    return this.checkStore().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  checkStore(): Observable<boolean> {
    return this.store.pipe(
      select(fromStore.getOrdersLoaded),
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(new fromStore.LoadOrders());
        }
      }),
      filter(loaded => loaded),
      take(1)
    );
  }
}
